import { addElement, updateElement } from '../../services/editor/dispatch-actions';
//@ElementFactory
import { initialState, generateElement } from './utils';
import { EditorState } from '@/services/editor/types';

describe('updateElement Action', () => {
    const type = 'UPDATE_ELEMENT';

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
        // Text Element 1
        currentState = addElement(currentState, {
            type: 'ADD_ELEMENT',
            payload: {
                containerId: '_body',
                elementDetails: generateElement(),
                position: 1,
            },
        });
        // Text Element 2 nested in Container 1
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
        });
    });

    it('should update an element style', () => {
        const newState = updateElement(currentState, {
            type,
            payload: {
                elementDetails: {
                    ...nested_element,
                    stylePerDevice: {
                        ...nested_element.stylePerDevice,
                        desktop: {
                            ...nested_element.stylePerDevice.desktop,
                            color: 'red',
                        },
                    },
                },
            },
        });

        expect(newState.editor.elements[0].content).toHaveLength(2);
        expect(Array.isArray(newState.editor.elements[0].content)).toBeTruthy();

        if (
            Array.isArray(newState.editor.elements[0].content) &&
            Array.isArray(newState.editor.elements[0].content[0].content)
        ) {
            expect(newState.editor.elements[0].content[0].content[0].stylePerDevice.desktop.color).toBe('red');
        }
    });

    it('should update an element content', () => {
        const newState = updateElement(currentState, {
            type,
            payload: {
                elementDetails: {
                    ...nested_element,
                    content: {
                        text: 'Hello World',
                        href: 'https://www.google.com',
                        alt: 'Google',
                        src: 'https://www.google.com/logo.png',
                    },
                },
            },
        });

        const element =
            Array.isArray(newState.editor.elements[0].content) && newState.editor.elements[0].content[0].content;

        expect(element).toHaveLength(1);
        if (Array.isArray(element)) {
            expect(element[0].content).toHaveProperty('text', 'Hello World');
            expect(element[0].content).toHaveProperty('href', 'https://www.google.com');
            expect(element[0].content).toHaveProperty('alt', 'Google');
            expect(element[0].content).toHaveProperty('src', 'https://www.google.com/logo.png');
        }
    });

    it("Shouldn't update an element if it doesn't exist", () => {
        const newState = updateElement(currentState, {
            type,
            payload: {
                elementDetails: {
                    ...nested_element,
                    id: 'non_existent_id',
                },
            },
        });

        expect(newState).toBe(currentState);
    });
});
