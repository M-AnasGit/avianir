import { EditorState } from './types';

export const initialStyles: React.CSSProperties = {
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

const bodyStyles: React.CSSProperties = {
    ...initialStyles,
    width: '100%',
    height: '1000px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '2px',
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
