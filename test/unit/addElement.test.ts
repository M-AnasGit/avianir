import { addElement } from '../../features/editor/dispatch-actions';
//@ElementFactory
import { initialState, generateElement } from './utils';

describe('addElement Action', () => {
    const type = 'ADD_ELEMENT';

    it('should add a new element to the editor state', () => {
        const newState = addElement(initialState, {
            type,
            payload: {
                containerId: '_body',
                elementDetails: generateElement(),
                position: 0,
            },
        });

        expect(newState.editor.elements).toHaveLength(1);
        expect(newState.editor.elementsMap.size).toBe(2);
    });

    it('should not add an element if the container does not exist', () => {
        const newState = addElement(initialState, {
            type,
            payload: {
                containerId: '_not_body',
                elementDetails: generateElement(),
                position: 0,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(0);
        expect(newState.editor.elementsMap.size).toBe(1);
    });
});
