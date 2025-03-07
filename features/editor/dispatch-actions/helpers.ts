import { ChapterData, Editor, EditorElement, EditorState } from '../types';

/**
 * Retrieves the hierarchical index path of a given element within the editor's element map.
 * This function traces back from the current element up to the root, collecting the indexes of each parent.
 *
 * @param elementsMap - A map of elements where each element has a parent-child structure.
 * @param  currentElement - The element for which the index path is needed.
 * @returns {number[]} An array representing the index path from the root element to the given element.
 */
export const getSpecificElement = (
    elementsMap: Editor['elementsMap'],
    currentElement: { parentId: string | null; index: number } | undefined,
): number[] => {
    let indexes: number[] = [];
    while (currentElement) {
        if (currentElement.parentId) {
            currentElement = elementsMap.get(currentElement.parentId);
            currentElement && indexes.push(currentElement.index);
        } else {
            break;
        }
    }

    indexes.reverse();

    return indexes;
};

/**
 * Retrieves the full hierarchy of parent indexes for a given element in the editor.
 * This function starts from the given element and moves up the hierarchy, collecting indexes.
 *
 * @param elementsMap - A map of elements where each element has a parent-child relationship.
 * @param currentElement - The element whose parent hierarchy needs to be found.
 * @returns {number[]} An array representing the hierarchical index path from the root to the element.
 */
export const getElementContainer = (
    elementsMap: Editor['elementsMap'],
    currentElement: { parentId: string | null; index: number } | undefined,
): number[] => {
    let indexes: number[] = [];

    while (currentElement) {
        indexes.push(currentElement.index);
        if (currentElement.parentId) {
            currentElement = elementsMap.get(currentElement.parentId);
        } else {
            break;
        }
    }

    indexes.reverse();

    return indexes;
};

/**
 * Retrieves all the children IDs of a container element in the editor.
 *
 * @param content - Editor content
 * @returns {string[]} An array of all the children IDs of the container element.
 */
export const getAllContainerChildren = (content: EditorElement[]): string[] => {
    let ids: string[] = [];

    for (const element of content) {
        if (Array.isArray(element.content) && element.content.length > 0) {
            ids = ids.concat(getAllContainerChildren(element.content));
        }

        ids.push(element.id);
    }

    return ids;
};

/**
 * Updates the editor state while maintaining an undo history.
 * This function ensures that the editor's state history only keeps the last 8 changes
 * before the current one, preventing excessive memory usage.
 *
 * @param state - The current state of the editor.
 * @param updatedEditorState - The new editor state to be applied.
 * @returns The updated state, including the new editor state and an updated history.
 */
export const updateState = (state: EditorState, updatedEditorState: Editor, noHistory?: boolean): EditorState => {
    let updatedHistory: Editor[] = state.history.history;

    if (!noHistory) {
        updatedHistory = state.history.history
            .slice(Math.max(0, state.history.currentIndex - 8), state.history.currentIndex + 1)
            .concat(updatedEditorState);
    }

    const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
            ...state.history,
            history: updatedHistory,
            currentIndex: updatedHistory.length - 1,
        },
    };

    return newEditorState;
};
