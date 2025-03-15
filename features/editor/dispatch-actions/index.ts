import { getElementContainer, getSpecificElement, getAllContainerChildren, updateState } from './helpers';
import { Editor, EditorAction, EditorState, EditorElement } from '../types';

/**
 * Adds a new element to the editor state.
 * The element is inserted into the specified container, maintaining immutability.
 *
 * @param state - The current editor state
 * @param action - The action containing the element details and container ID
 * @returns The updated editor state with the new element added
 */
export const addElement = (state: EditorState, action: EditorAction): EditorState => {
    if (action.type !== 'ADD_ELEMENT') return state;

    const { elements, elementsMap } = { ...state.editor };
    const { payload } = action;

    let currentElement = elementsMap.get(payload.containerId);
    if (!currentElement) return state;

    const indexes = getElementContainer(elementsMap, currentElement);
    const newElements = JSON.parse(JSON.stringify(elements)) as EditorElement[];
    let currentElements = newElements;

    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        if (
            currentElements[index].content &&
            Array.isArray(currentElements[index].content) &&
            currentElements[index].type === 'container'
        ) {
            currentElements = currentElements[index].content as EditorElement[];
        } else {
            return state;
        }
    }

    const newElement: EditorElement = {
        ...payload.elementDetails,
    };

    const newElementsMap = new Map(elementsMap);
    newElementsMap.set(newElement.id, {
        index: payload.position,
        parentId: payload.containerId,
    });

    for (let j = payload.position; j < currentElements.length; j++) {
        const old_element_in_position = currentElements[j].id;

        newElementsMap.set(old_element_in_position, {
            index: j + 1,
            parentId: payload.containerId,
        });
    }

    currentElements.splice(payload.position, 0, newElement);

    const updatedEditorState: Editor = {
        ...state.editor,
        elements: newElements,
        elementsMap: newElementsMap,
        selectedElement:
            state.editor.selectedElement && state.editor.selectedElementId === payload.containerId
                ? {
                      ...state.editor.selectedElement,
                      content: [...currentElements],
                  }
                : state.editor.selectedElement,
    };

    return updateState(state, updatedEditorState);
};

/**
 * Updates an existing element within the editor state.
 *
 * @param state - The current editor state
 * @param action - The action containing the updated element details
 * @returns The updated editor state with the modified element
 */
export const updateElement = (state: EditorState, action: EditorAction): EditorState => {
    if (action.type !== 'UPDATE_ELEMENT') return state;

    const { elements, elementsMap } = { ...state.editor };
    const { payload } = action;

    let currentElement = elementsMap.get(payload.elementDetails.id);
    if (!currentElement) return state;
    let { index } = currentElement;
    const indexes = getSpecificElement(elementsMap, currentElement);

    const newElements = JSON.parse(JSON.stringify(elements)) as EditorElement[];
    let currentElements = newElements;
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        if (currentElements[index].content && Array.isArray(currentElements[index].content)) {
            currentElements = currentElements[index].content as EditorElement[];
        } else {
            return state;
        }
    }
    currentElements[index] = payload.elementDetails;

    const updatedEditorState: Editor = {
        ...state.editor,
        elements: newElements,
        selectedElement: payload.elementDetails,
    };

    return updateState(state, updatedEditorState);
};

/**
 * Move an element within the editor state.
 * @param state - The current editor state
 * @param action - The action containing the updated element details
 * @returns The updated editor state with the modified element
 */
export const moveElement = (state: EditorState, action: EditorAction): EditorState => {
    if (action.type !== 'MOVE_ELEMENT') return state;
    const payload = action.payload;

    const { elements, elementsMap } = state.editor;

    let element_to_be_moved = elementsMap.get(payload.elementId);
    let target_container = elementsMap.get(payload.containerId);
    if (!element_to_be_moved || !target_container) return state;

    const newELements = JSON.parse(JSON.stringify(elements)) as EditorElement[];

    const { index: current_element_index } = element_to_be_moved;

    const element_to_be_moved_indexes = getSpecificElement(elementsMap, element_to_be_moved);

    let current_element_container = newELements;
    for (let i = 0; i < element_to_be_moved_indexes.length; i++) {
        const index = element_to_be_moved_indexes[i];
        if (current_element_container[index].content && Array.isArray(current_element_container[index].content)) {
            current_element_container = current_element_container[index].content as EditorElement[];
        } else {
            return state;
        }
    }

    const target_container_indexes = getElementContainer(elementsMap, target_container);

    let target_container_elements = newELements;
    for (let i = 0; i < target_container_indexes.length; i++) {
        const index = target_container_indexes[i];
        if (
            target_container_elements[index].content &&
            Array.isArray(target_container_elements[index].content) &&
            target_container_elements[index].type === 'container'
        ) {
            target_container_elements = target_container_elements[index].content as EditorElement[];
        } else {
            return state;
        }
    }

    const [ele_details] = current_element_container.splice(current_element_index, 1);

    let newPosition = payload.position;

    if (newPosition >= target_container_elements.length) {
        newPosition = target_container_elements.length;
    }

    target_container_elements.splice(newPosition, 0, ele_details);

    const newElementsMap = new Map(elementsMap);
    for (let j = 0; j < target_container_elements.length; j++) {
        const old_element_in_position = target_container_elements[j].id;

        newElementsMap.set(old_element_in_position, {
            index: j,
            parentId: payload.containerId,
        });
    }
    for (let j = 0; j < current_element_container.length; j++) {
        const old_element_in_position = current_element_container[j].id;

        newElementsMap.set(old_element_in_position, {
            index: j,
            parentId: element_to_be_moved.parentId,
        });
    }

    const updatedEditorState: Editor = {
        ...state.editor,
        elements: newELements,
        elementsMap: newElementsMap,
        selectedElement:
            state.editor.selectedElement && state.editor.selectedElementId === payload.containerId
                ? {
                      ...state.editor.selectedElement,
                      content: [...target_container_elements],
                  }
                : state.editor.selectedElement,
    };

    return updateState(state, updatedEditorState);
};

/**
 * Deletes an element from the editor state.
 *
 * @param state - The current editor state
 * @param action - The action containing the ID of the element to be deleted
 * @returns The updated editor state with the element removed
 */
export const deleteElement = (state: EditorState, action: EditorAction): EditorState => {
    if (action.type !== 'DELETE_ELEMENT') return state;

    const { elements, elementsMap, selectedElement, selectedElementId } = {
        ...state.editor,
    };

    if (!selectedElementId || !elementsMap.has(selectedElementId)) return state;

    const currentElement = elementsMap.get(selectedElementId);

    if (!currentElement) return state;

    let { index } = currentElement;
    const indexes = getSpecificElement(elementsMap, currentElement);

    const newElements = JSON.parse(JSON.stringify(elements)) as EditorElement[];
    let currentElements = newElements;
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        if (currentElements[index].content && Array.isArray(currentElements[index].content)) {
            currentElements = currentElements[index].content as EditorElement[];
        } else {
            return state;
        }
    }

    const newElementsMap = new Map(elementsMap);

    currentElements.splice(index, 1);
    newElementsMap.delete(selectedElementId);

    for (let i = index; i < currentElements.length; i++) {
        const old_element_in_position = currentElements[i].id;

        newElementsMap.set(old_element_in_position, {
            index: i,
            parentId: currentElement.parentId,
        });
    }

    if (Array.isArray(selectedElement?.content) && selectedElement.content.length > 0) {
        const childrenIds = getAllContainerChildren(selectedElement.content);
        childrenIds.forEach((id) => newElementsMap.delete(id));
    }

    const updatedEditorState: Editor = {
        ...state.editor,
        elements: newElements,
        elementsMap: newElementsMap,
        selectedElement: null,
        selectedElementId: null,
    };

    return updateState(state, updatedEditorState);
};

/**
 * Changes the active device in the editor.
 *
 * @param state - The current editor state
 * @param action - The action containing the new device type
 * @returns The updated editor state with the new device selected
 */
export const changeDevice = (state: EditorState, action: EditorAction): EditorState => {
    if (action.type !== 'CHANGE_DEVICE') return state;
    const { device } = action.payload;
    return {
        ...state,
        editor: {
            ...state.editor,
            device,
        },
    };
};

/**
 * Updates the currently selected element in the editor.
 *
 * @param state - The current editor state
 * @param action - The action containing the ID of the selected element
 * @returns The updated editor state with the selected element highlighted
 */
export const changeSelectedElement = (state: EditorState, action: EditorAction): EditorState => {
    if (action.type !== 'CHANGE_CLICKED_ELEMENT') return state;
    const payload = action.payload;
    const { elements, elementsMap } = state.editor;

    let currentElement = elementsMap.get(payload.elementId);
    if (!currentElement) return state;
    let { index } = currentElement;

    const indexes = getSpecificElement(elementsMap, currentElement);

    let currentElements = elements;
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        if (currentElements[index].content && Array.isArray(currentElements[index].content)) {
            currentElements = currentElements[index].content as EditorElement[];
        } else {
            return state;
        }
    }
    const selectedElement = currentElements[index];
    return updateState(
        state,
        {
            ...state.editor,
            selectedElement: selectedElement ? selectedElement : null,
            selectedElementId: payload.elementId,
        },
        true,
    );
};

/**
 * Toggles preview mode in the editor.
 *
 * @param state - The current editor state
 * @returns The updated editor state with preview mode toggled
 */
export const togglePreview = (state: EditorState): EditorState => {
    const { editor } = state;
    return {
        ...state,
        editor: {
            ...editor,
            preview: !editor.preview,
        },
    };
};

/**
 * Undoes the last action performed in the editor.
 *
 * @param state - The current editor state
 * @returns The updated editor state with the previous state restored
 */
export const undo = (state: EditorState): EditorState => {
    if (state.history.currentIndex < 0 || state.history.history.length < 1) return state;

    const updatedEditorState = state.history.history[Math.max(state.history.currentIndex - 1, 0)];
    return {
        ...state,
        editor: updatedEditorState,
        history: {
            ...state.history,
            currentIndex: state.history.currentIndex - 1,
        },
    };
};

/**
 * Redoes the last undone action in the editor.
 *
 * @param state - The current editor state
 * @returns The updated editor state with the next state reapplied
 */
export const redo = (state: EditorState): EditorState => {
    if (state.history.currentIndex >= state.history.history.length - 1 || state.history.history.length <= 1)
        return state;

    const updatedEditorState = state.history.history[state.history.currentIndex + 1];
    return {
        ...state,
        editor: updatedEditorState,
        history: {
            ...state.history,
            currentIndex: state.history.currentIndex + 1,
        },
    };
};
