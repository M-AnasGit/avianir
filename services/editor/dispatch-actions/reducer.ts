import { initialState } from '../constants';
import { EditorAction, EditorState } from '../types';

import {
    addElement,
    updateElement,
    deleteElement,
    changeDevice,
    changeSelectedElement,
    togglePreview,
    undo,
    redo,
    moveElement,
} from './';

const editorReducer = (state: EditorState = initialState, action: EditorAction): EditorState => {
    switch (action.type) {
        case 'ADD_ELEMENT':
            return addElement(state, action);
        case 'UPDATE_ELEMENT':
            return updateElement(state, action);
        case 'MOVE_ELEMENT':
            return moveElement(state, action);
        case 'DELETE_ELEMENT':
            return deleteElement(state, action);
        case 'CHANGE_CLICKED_ELEMENT':
            return changeSelectedElement(state, action);
        case 'CHANGE_DEVICE':
            return changeDevice(state, action);
        case 'TOGGLE_PREVIEW_MODE':
            return togglePreview(state);
        case 'REDO':
            return redo(state);
        case 'UNDO':
            return undo(state);
        case 'LOAD_DATA':
            return action.payload.state;
        default:
            return state;
    }
};

export default editorReducer;
