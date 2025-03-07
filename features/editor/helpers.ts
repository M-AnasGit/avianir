import { ChapterData, EditorState } from './types';

/**
 * Loads the editor state with the given chapter data.
 *
 * @param chapterData - The data to be loaded into the editor.
 * @returns The initial editor state with the given chapter data.
 */
export const loadData = (chapterData: ChapterData, course_id: string, chapter_id: string): EditorState => {
    const { elements, elementsMap } = chapterData;

    return {
        course_id,
        chapter_id,
        editor: {
            elements,
            elementsMap: new Map(elementsMap),
            selectedElement: null,
            selectedElementId: null,
            device: 'desktop',
            preview: false,
        },
        history: {
            history: [],
            currentIndex: -1,
        },
    };
};

/**
 * Unloads the editor state and returns the chapter data.
 *
 * @param state  - The editor state to be unloaded.
 * @returns The chapter data from the editor state.
 */
export const unloadData = (state: EditorState): ChapterData => {
    return {
        elements: state.editor.elements,
        elementsMap: Array.from(state.editor.elementsMap),
    };
};
