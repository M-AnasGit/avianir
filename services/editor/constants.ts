import {
    Box,
    Type,
    Image,
    Clapperboard,
    Headphones,
    BookText,
    TextCursorInput,
    Circle,
    Check,
    Table,
    LucideIcon,
} from 'lucide-react';

import { EditorState } from './types';

export const INITIAL_STYLES: React.CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
    backgroundPosition: 'center',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'left',
    opacity: '100%',
    paddingTop: '4px',
    paddingRight: '4px',
    paddingBottom: '4px',
    paddingLeft: '4px',
};

export const DUMMY_CONTENT: Record<string, string> = {
    text: '<p>Text</p>',
    table: `
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding: 8px;">Header 1</th>
                    <th style="padding: 8px;">Header 2</th>
                    <th style="padding: 8px;">Header 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 8px;">Row 1, Col 1</td>
                    <td style="padding: 8px;">Row 1, Col 2</td>
                    <td style="padding: 8px;">Row 1, Col 3</td>
                </tr>
                <tr>
                    <td style="padding: 8px;">Row 2, Col 1</td>
                    <td style="padding: 8px;">Row 2, Col 2</td>
                    <td style="padding: 8px;">Row 2, Col 3</td>
                </tr>
            </tbody>
        </table>
    `,
};

export const COMPONENTS_TYPES_ICONS: Record<string, LucideIcon> = {
    text: Type,
    container: Box,
    table: Table,
    image: Image,
    video: Clapperboard,
    audio: Headphones,
    form: BookText,
    input: TextCursorInput,
    radio: Circle,
    checkbox: Check,
};

const bodyStyles: React.CSSProperties = {
    width: '100%',
    height: '1000px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '4px',
};

export const initialEditorState: EditorState['editor'] = {
    elements: [
        {
            id: '_body',
            name: 'Body',
            type: 'container',
            stylePerDevice: {
                desktop: {
                    ...bodyStyles,
                },
                tablet: {
                    ...bodyStyles,
                },
                mobile: {
                    ...bodyStyles,
                },
            },
            globalStyle: true,
            content: [],
        },
    ],
    elementsMap: new Map([['_body', { index: 0, parentId: null }]]),
    selectedElement: null,
    selectedElementId: null,
    device: 'desktop',
    preview: false,
};

export const initialHistoryState: EditorState['history'] = {
    history: [initialEditorState],
    currentIndex: 0,
};

export const initialState: EditorState = {
    course_id: '',
    chapter_id: '',
    editor: initialEditorState,
    history: initialHistoryState,
};
