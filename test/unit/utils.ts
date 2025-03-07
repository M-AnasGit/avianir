import MockElementFactory from './mock-element-factory';
//@Constants
import { initialEditorState, initialHistoryState } from '../../features/editor/constants';
//@TYPES
import { EditorElement, EditorState, ElementTypes } from '../../features/editor/types';

export let initialState: EditorState = {
    editor: {
        ...initialEditorState,
    },
    history: {
        ...initialHistoryState,
    },
    presets: [],
};
export function generateElement(type?: ElementTypes) {
    return MockElementFactory.createElement(type || 'text');
}

export function isContentArray(content: EditorElement['content']): content is EditorElement[] {
    return Array.isArray(content);
}
