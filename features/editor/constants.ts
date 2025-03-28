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

export const defaultPalette: Palette = {
    default: {
        text: {
            light: '#222222',
            dark: '#EAEAEA',
        },
        link: {
            light: '#0077CC',
            dark: '#66BFFF',
        },
        quote: {
            light: '#555555',
            dark: '#BBBBBB',
        },
        'btn text': {
            light: '#FFFFFF',
            dark: '#FFFFFF',
        },
        'btn background': {
            light: '#0366D6',
            dark: '#58A6FF',
        },
        'input text': {
            light: '#24292E',
            dark: '#E1E4E8',
        },
        'input border': {
            light: '#E1E4E8',
            dark: '#30363D',
        },
        'input background': {
            light: '#FAFBFC',
            dark: '#0D1117',
        },
        'success background': {
            light: '#D4EDDA',
            dark: '#1E4620',
        },
        'success foreground': {
            light: '#155724',
            dark: '#A3E635',
        },
        'warning background': {
            light: '#FFF3CD',
            dark: '#664D03',
        },
        'warning foreground': {
            light: '#856404',
            dark: '#FFDD57',
        },
        'error background': {
            light: '#F8D7DA',
            dark: '#58151C',
        },
        'error foreground': {
            light: '#721C24',
            dark: '#F87171',
        },
        'code keyword': {
            light: '#D73A49',
            dark: '#FF7B72',
        },
        'code variable': {
            light: '#005CC5',
            dark: '#79B8FF',
        },
        'code number': {
            light: '#986801',
            dark: '#E1C16E',
        },
        'code string': {
            light: '#032F62',
            dark: '#9ECBFF',
        },
        'code title': {
            light: '#6F42C1',
            dark: '#B392F0',
        },
        'code comment': {
            light: '#6A737D',
            dark: '#8B949E',
        },
        'code background': {
            light: '#F6F8FA',
            dark: '#0D1117',
        },
        'table header': {
            light: '#0366D6',
            dark: '#58A6FF',
        },
        'table select': {
            light: '#EAEAEA',
            dark: '#2D2D2D',
        },
        'table border color': {
            light: '#D1D5DA',
            dark: '#30363D',
        },
    },
    custom: {},
};
