import { addElement, deleteElement, changeSelectedElement } from '../../services/editor/dispatch-actions';
//@ElementFactory
import { initialState, generateElement, isContentArray } from './utils';
import { EditorState } from '@/services/editor/types';

describe('deleteElement Action', () => {
    const type = 'DELETE_ELEMENT';

    let currentState: EditorState = initialState;
    let nested_element = generateElement();
    beforeAll(() => {
        // Container 1
        currentState = addElement(initialState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: generateElement('container'),
                position: 0,
            },
        });
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId:
                    (Array.isArray(currentState.editor.elements[0].content) &&
                        currentState.editor.elements[0].content[0].id) ||
                    '',
                elementDetails: nested_element,
                position: 0,
            },
        }); // Nested Text Element
        // Text Element 1
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: generateElement(),
                position: 1,
            },
        });
    });

    it('should delete the selected element', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const selectedElement = changeSelectedElement(currentState, {
            type: 'CHANGE_CLICKED_ELEMENT',
            payload: {
                elementId: currentState.editor.elements[0].content[0].id,
            },
        });

        const elementDeleted = deleteElement(selectedElement, {
            type,
        });

        expect(elementDeleted.editor.elements[0].content).toHaveLength(1);
    });

    it('should delete the nested element', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const selectedElement = changeSelectedElement(currentState, {
            type: 'CHANGE_CLICKED_ELEMENT',
            payload: {
                elementId: nested_element.id,
            },
        });

        const elementDeleted = deleteElement(selectedElement, {
            type,
        });

        expect(elementDeleted.editor.elements[0].content).toHaveLength(2);
    });

    it('should not delete if no selected element', () => {
        const elementDeleted = deleteElement(currentState, {
            type,
        });

        expect(elementDeleted.editor.elements[0].content).toHaveLength(2);
    });
});
