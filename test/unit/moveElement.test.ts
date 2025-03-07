import { addElement, moveElement } from '../../features/editor/dispatch-actions';
//@ElementFactory
import { initialState, generateElement, isContentArray } from './utils';
import { EditorState } from '@/features/editor/types';

describe('moveELement Action', () => {
    const type = 'MOVE_ELEMENT';

    let currentState: EditorState = initialState;
    let nested_element = generateElement();
    let text_element = generateElement();
    beforeAll(() => {
        // Container 1
        const container_1 = generateElement('container');
        currentState = addElement(initialState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: container_1,
                position: 0,
            },
        });
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: container_1.id,
                elementDetails: nested_element,
                position: 0,
            },
        }); // Nested text
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: container_1.id,
                elementDetails: generateElement(),
                position: 1,
            },
        }); // Nested text
        // Text Element 1
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: text_element,
                position: 1,
            },
        });
        // Text Element 2
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: generateElement(),
                position: 2,
            },
        });
        // Image Element 1
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: generateElement('image'),
                position: 3,
            },
        });
        // Container 2
        const container_2 = generateElement('container');
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: container_2,
                position: 4,
            },
        });
        const nested_container = generateElement('container');
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: container_2.id,
                elementDetails: nested_container,
                position: 0,
            },
        }); // Nested container
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: nested_container.id,
                elementDetails: generateElement(),
                position: 1,
            },
        }); // Nested text in nested container
        // Container 3
        const container_3 = generateElement('container');
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: container_3,
                position: 5,
            },
        });
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: container_3.id,
                elementDetails: generateElement(),
                position: 0,
            },
        }); // Nested text
    });

    it('should move an element from the body to a container', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: currentState.editor.elements[0].content[1].id,
                containerId: currentState.editor.elements[0].content[0].id,
                position: 1,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(5);
        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }
        expect(newState.editor.elements[0].content[0].content).toHaveLength(3);

        if (!isContentArray(newState.editor.elements[0].content[0].content)) {
            throw new Error('Content is not an array');
        }

        Object.entries(newState.editor.elements[0].content[0].content[0]).forEach(([k, v]) => {
            expect(nested_element).toHaveProperty(k, v);
        });

        Object.entries(newState.editor.elements[0].content[0].content[1]).forEach(([k, v]) => {
            expect(text_element).toHaveProperty(k, v);
        });
    });

    it('should move an element from a container to the body', () => {
        if (
            !isContentArray(currentState.editor.elements[0].content) ||
            !isContentArray(currentState.editor.elements[0].content[0].content)
        ) {
            throw new Error('Content is not an array');
        }

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: currentState.editor.elements[0].content[0].content[0].id,
                containerId: '_body',
                position: 3,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(7);
        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }
        expect(newState.editor.elements[0].content[0].content).toHaveLength(1);

        Object.entries(newState.editor.elements[0].content[3]).forEach(([k, v]) => {
            expect(nested_element).toHaveProperty(k, v);
        });
    });

    it('should move an element from a container to a nested container', () => {
        if (
            !isContentArray(currentState.editor.elements[0].content) ||
            !isContentArray(currentState.editor.elements[0].content[0].content) ||
            !isContentArray(currentState.editor.elements[0].content[4].content)
        ) {
            throw new Error('Content is not an array');
        }

        const moved_element = currentState.editor.elements[0].content[0].content[0];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_element.id,
                containerId: currentState.editor.elements[0].content[4].content[0].id,
                position: 0,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(6);
        if (
            !isContentArray(newState.editor.elements[0].content) ||
            !isContentArray(newState.editor.elements[0].content[4].content)
        ) {
            throw new Error('Content is not an array');
        }

        expect(newState.editor.elements[0].content[4].content[0].content).toHaveLength(2);

        if (!isContentArray(newState.editor.elements[0].content[4].content[0].content)) {
            throw new Error('Content is not an array');
        }

        Object.entries(newState.editor.elements[0].content[4].content[0].content[0]).forEach(([k, v]) => {
            expect(moved_element).toHaveProperty(k, v);
        });
    });

    it('should move an element to a forward position in the same container', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const moved_element = currentState.editor.elements[0].content[0];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_element.id,
                containerId: currentState.editor.elements[0].id,
                position: 4,
            },
        });

        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }
        expect(newState.editor.elements[0].content).toHaveLength(6);

        Object.entries(newState.editor.elements[0].content[4]).forEach(([k, v]) => {
            expect(moved_element).toHaveProperty(k, v);
        });
    });

    it('should move an element to a behind position in the same container', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const moved_element = currentState.editor.elements[0].content[4];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_element.id,
                containerId: currentState.editor.elements[0].id,
                position: 2,
            },
        });

        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }
        expect(newState.editor.elements[0].content).toHaveLength(6);

        Object.entries(newState.editor.elements[0].content[2]).forEach(([k, v]) => {
            expect(moved_element).toHaveProperty(k, v);
        });
    });

    it('should move an element to the head position in the same container', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const moved_element = currentState.editor.elements[0].content[4];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_element.id,
                containerId: currentState.editor.elements[0].id,
                position: 0,
            },
        });

        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }
        expect(newState.editor.elements[0].content).toHaveLength(6);

        Object.entries(newState.editor.elements[0].content[0]).forEach(([k, v]) => {
            expect(moved_element).toHaveProperty(k, v);
        });
    });

    it('should move an element to the tail position in the same container', () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const moved_element = currentState.editor.elements[0].content[0];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_element.id,
                containerId: currentState.editor.elements[0].id,
                position: 5,
            },
        });

        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }
        expect(newState.editor.elements[0].content).toHaveLength(6);

        Object.entries(newState.editor.elements[0].content[5]).forEach(([k, v]) => {
            expect(moved_element).toHaveProperty(k, v);
        });
    });

    it('it should move a nested container to another container', () => {
        if (
            !isContentArray(currentState.editor.elements[0].content) ||
            !isContentArray(currentState.editor.elements[0].content[0].content)
        ) {
            throw new Error('Content is not an array');
        }

        const moved_container = currentState.editor.elements[0].content[0];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_container.id,
                containerId: currentState.editor.elements[0].content[5].id,
                position: 0,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(5);

        if (
            !isContentArray(newState.editor.elements[0].content) ||
            !isContentArray(newState.editor.elements[0].content[4].content)
        ) {
            throw new Error('Content is not an array');
        }

        Object.entries(newState.editor.elements[0].content[4].content[0]).forEach(([k, v]) => {
            expect(moved_container).toHaveProperty(k, v);
        });
    });

    it('it should move a nested container to the body', () => {
        if (
            !isContentArray(currentState.editor.elements[0].content) ||
            !isContentArray(currentState.editor.elements[0].content[4].content)
        ) {
            throw new Error('Content is not an array');
        }

        const moved_container = currentState.editor.elements[0].content[4].content[0];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_container.id,
                containerId: '_body',
                position: 2,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(7);

        if (!isContentArray(newState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        Object.entries(newState.editor.elements[0].content[2]).forEach(([k, v]) => {
            expect(moved_container).toHaveProperty(k, v);
        });
    });

    it('it should move a nested container to another container', () => {
        if (
            !isContentArray(currentState.editor.elements[0].content) ||
            !isContentArray(currentState.editor.elements[0].content[4].content)
        ) {
            throw new Error('Content is not an array');
        }

        const moved_container = currentState.editor.elements[0].content[4].content[0];

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: moved_container.id,
                containerId: currentState.editor.elements[0].content[0].id,
                position: 0,
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(6);

        if (
            !isContentArray(newState.editor.elements[0].content) ||
            !isContentArray(newState.editor.elements[0].content[0].content)
        ) {
            throw new Error('Content is not an array');
        }

        Object.entries(newState.editor.elements[0].content[0].content[0]).forEach(([k, v]) => {
            expect(moved_container).toHaveProperty(k, v);
        });
    });

    it("it should not move an element to a position that doesn't exist", () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: currentState.editor.elements[0].content[0].id,
                containerId: currentState.editor.elements[0].id,
                position: 10,
            },
        });

        expect(newState).toBe(currentState);
    });

    it("it should not move an element to a container that doesn't exist", () => {
        if (!isContentArray(currentState.editor.elements[0].content)) {
            throw new Error('Content is not an array');
        }

        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: currentState.editor.elements[0].content[0].id,
                containerId: 'non_existent_id',
                position: 0,
            },
        });

        expect(newState).toBe(currentState);
    });

    it("it should not move an element that doesn't exist", () => {
        const newState = moveElement(currentState, {
            type,
            payload: {
                elementId: 'non_existent_id',
                containerId: currentState.editor.elements[0].id,
                position: 0,
            },
        });

        expect(newState).toBe(currentState);
    });
});
