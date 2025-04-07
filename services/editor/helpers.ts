import { INITIAL_STYLES } from './constants';
import { ChapterData, DeviceTypes, EditorElement, EditorState } from './types';

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
            elements: elements.map((e) => ({
                ...e,
                stylePerDevice: {
                    desktop: {
                        ...INITIAL_STYLES,
                        ...e.stylePerDevice.desktop,
                    },
                    tablet: {
                        ...INITIAL_STYLES,
                        ...e.stylePerDevice.tablet,
                    },
                    mobile: {
                        ...INITIAL_STYLES,
                        ...e.stylePerDevice.mobile,
                    },
                },
            })),
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

const unloadDataHelper = (e: EditorElement): EditorElement => {
    const currStyles = e.stylePerDevice;

    Object.entries(currStyles).forEach(([device, styles]) => {
        const typedStyles = styles as Record<string, any>;
        Object.keys(typedStyles).forEach((key) => {
            if (typedStyles[key] === (INITIAL_STYLES as Record<string, any>)[key]) {
                delete typedStyles[key];
            }
        });

        e.stylePerDevice[device as DeviceTypes] = typedStyles as React.CSSProperties;
    });

    if (e.content && Array.isArray(e.content)) {
        e.content = e.content.map((item) => {
            return unloadDataHelper(item);
        });
    }

    return e;
};

/**
 * Unloads the editor state and returns the chapter data.
 *
 * @param state  - The editor state to be unloaded.
 * @returns The chapter data from the editor state.
 */
export const unloadData = (state: EditorState): ChapterData => {
    return {
        elements: state.editor.elements.filter((e) => unloadDataHelper(e)),
        elementsMap: Array.from(state.editor.elementsMap),
    };
};

export const isDisabled = (ele: EditorElement, clipboard: EditorElement | null): boolean => {
    if (!clipboard) return true;
    if (!Array.isArray(ele.content)) return true;
    if (
        (clipboard.type === 'input' || clipboard.type === 'radio' || clipboard.type === 'checkbox') &&
        ele.type !== 'form'
    )
        return true;
    if (
        ele.type === 'form' &&
        clipboard.type !== 'input' &&
        clipboard.type !== 'radio' &&
        clipboard.type !== 'checkbox'
    )
        return true;

    return false;
};
