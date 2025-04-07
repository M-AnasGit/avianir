//@TYPES
import { ElementTypes, EditorElement } from '../../services/editor/types';

import { v4 } from 'uuid';

class MockElementFactory {
    static createElement(type: ElementTypes): EditorElement {
        const generateContent = (type: ElementTypes): EditorElement['content'] => {
            if (type === 'container' || type === 'form') {
                return [];
            }

            return {
                ...(type === 'text' && { text: 'Text' }),
            };
        };

        const generateStyle = (type: ElementTypes): React.CSSProperties => ({});

        const generateFormContent = (): EditorElement['formContent'] => ({
            form: {
                title: 'Form',
                description: 'Description',
                submit_btn_text: 'Submit',
            },
        });

        return {
            id: v4(),
            type,
            name: type,
            stylePerDevice: {
                desktop: generateStyle(type),
                tablet: generateStyle(type),
                mobile: generateStyle(type),
            },
            globalStyle: true,
            content: generateContent(type),
            ...(type === 'form' && { formContent: generateFormContent() }),
        };
    }
}

export default MockElementFactory;
