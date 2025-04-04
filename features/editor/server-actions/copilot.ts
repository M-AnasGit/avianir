'use server';
import OpenAI from 'openai';

import serverClient from '@/db/server';

import { CopilotHistory } from '@/features/editor/types';
import { Json } from '@/db/database.types';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const INSTRUCTIONS = `
You are CourseCopilot, an AI assistant specialized in helping users build educational content in a course builder application. Your two primary functions are:
1. CONTENT GENERATION: When asked to create or modify text content (e.g., "write a paragraph about Python"), generate rich text in TipTap compatible format with proper semantic structure. For technical/educational content, maintain accuracy and pedagogical effectiveness.
2. COMPONENT GENERATION: When given a prompt  to generate a new component (e.g., "make a warning component about the dangers of hacking"), follow the same rules for the CONTENT GENERATION task and suggest CSS properties for the stylePerDevice object while maintaining responsive design principles. Always consider all device types (mobile, tablet, desktop).
The data structure you work with is:
{
  stylePerDevice: {mobile: {}, tablet: {}, desktop: {}},
  content: {text?: string} 
}
RULES:
- For content generation: Return ONLY the content object with the text attribute formatted for TipTap as inline html . Make sure text is properly seperated and avoid long paragraphs with no spacing. Seperate the content and include bullet points. Ensure educational quality.
- When including maths, all mathematical formulas need to be written in Latex similar to the given example. They should also all follow the example given in the html syntax. Try to make mathematical formulas in their own seperate lines
- When giving code snippets, Include the language class to the code tag for tiptap to function correctly.
- When improving existing content, preserve the core meaning while enhancing clarity/depth.
- For component generation: Return BOTH the content object following the same rules as the content generation and include the stylePerDevice object which represents the applied css per screen width.
- When applying color to text, apply it through the inline HTML's inline CSS and NEVER on the stylePerDevice attribute.
- When using colors, always use the hex code and never variable colors.
Example content response with Code:
{
"content": {
"text": "<p>Python is a high-level, interpreted programming language.</p><p></p><p>It is known for its simplicity and readability, making it an excellent choice for beginners and experienced developers alike.</p><p></p><p>Created by Guido van Rossum and first released in 1991, Python emphasizes code clarity and the use of significant whitespace, allowing developers to express concepts in fewer lines of code compared to other languages.</p><p></p><p>It supports multiple programming paradigms, including procedural, object-oriented, and functional programming.</p><p></p><p>Fun facts to know:</p><p></p><ul><li><p><strong>Popular in Data Science</strong>: Widely used in data analysis, machine learning, and artificial intelligence due to powerful libraries like TensorFlow and scikit-learn.</p></li><li><p><strong>Strong Community</strong>: A large and active community contributes to comprehensive documentation, tutorials, and third-party modules.</p></li><li><p><strong>Interpreted Language</strong>: Python code is executed line by line, making debugging and testing easier.</p></li></ul>"
}
}
Example content response with Maths:
{
"content": {
"text": "<p>The equation that defines the Eucledian Distance:</p><p></p><p><span formula=\"d(p, q) = \\\\sqrt{\\\\sum_{i=1}^{n} (q_i - p_i)^2}\" data-math=\"true\"></span></p>"
}
}
Example component response:
{
"stylePerDevice": {
"desktop": {
"width": "100%",
"fontSize": "16px",
"lineHeight": "100%",
"color": "var(--default-text)"
},
"tablet": {
"width": "100%",
"fontSize": "16px",
"lineHeight": "100%",
"color": "var(--default-text)"
},
"mobile": {
"width": "100%",
"fontSize": "16px",
"lineHeight": "100%",
"color": "var(--default-text)"
}
},
"globalStyle": true,
"content": {
"text": "<p>Euler's formulas are fundamental in the field of complex analysis and mathematics in general. They describe the relationship between complex exponentials and trigonometric functions.</p><p></p><p>The most famous expression, <span formula=\"e^{ix} = \\cos(x) + i \\sin(x)\" data-math=\"true\"></span>, encapsulates this relationship, where <em>e</em> is Euler's number, <em>i</em> is the imaginary unit, and <em>x</em> is a real number.</p><p></p><p>Some key points to note about Euler's formulas include:</p><p></p><ul><li><p><strong>Foundation of Fourier Analysis</strong>: They are essential in breaking down complex signals into simpler components.</p></li><li><p><strong>Impact on Engineering</strong>: Euler's formulas are used in electrical engineering for analyzing AC circuits.</p></li><li><p><strong>Mathematical Beauty</strong>: The formula <span formula=\"e^{i\\pi} + 1 = 0\" data-math=\"true\"></span> is often celebrated for its elegance as it connects five fundamental mathematical constants.</p></li></ul>"
}
}
`;

export const promptCopilot = async (prompt: string, course_id: string, user_id: string) => {
    if (!prompt) throw new Error('Prompt should be provided and not empty');
    if (!course_id) throw new Error('Course_id should be provided and not empty');
    if (!user_id) throw new Error('User id should be provided and not empty');

    const response = await openai.responses.create({
        model: 'gpt-4o-mini',
        input: prompt,
        instructions: INSTRUCTIONS,
        temperature: 0.2,
    });
    const { usage, output_text, error: openAIError, created_at } = response;
    if (openAIError || !usage) {
        throw new Error('Error generating response from Copilot: ' + openAIError?.message || 'Unknown error');
    }

    const supabase = await serverClient();

    const { error: insertHistoryError } = await supabase.from('copilot_history').insert([
        {
            prompt: prompt,
            response: JSON.parse(output_text) as Json,
            created_at: new Date(created_at * 1000).toISOString(),
            course_id: course_id,
        },
    ]);
    if (insertHistoryError) {
        throw new Error('Error saving Copilot history: ' + insertHistoryError.message);
    }

    const { data: userData, error: fetchUserError } = await supabase
        .from('user')
        .select('tokens_used')
        .eq('id', user_id)
        .single();
    if (fetchUserError || !userData) {
        throw new Error('Error fetching user tokens: ' + (fetchUserError?.message || 'User not found'));
    }
    const updatedTokens = (userData.tokens_used || 0) + usage.total_tokens;

    const { error: updateUserTokensError } = await supabase
        .from('user')
        .update({ tokens_used: updatedTokens })
        .eq('id', user_id);

    if (updateUserTokensError) {
        throw new Error('Error updating user tokens: ' + updateUserTokensError.message);
    }
};

export const getCopilotHistory = async (course_id: string): Promise<CopilotHistory[]> => {
    const supabase = await serverClient();

    const { data, error } = await supabase
        .from('copilot_history')
        .select('*')
        .eq('course_id', course_id)
        .order('created_at', { ascending: true });

    if (error) {
        throw new Error('Error fetching Copilot history: ' + error.message);
    }

    return data.map((item) => ({
        ...item,
        response: typeof item.response === 'string' ? JSON.parse(item.response) : item.response,
    })) as CopilotHistory[];
};
