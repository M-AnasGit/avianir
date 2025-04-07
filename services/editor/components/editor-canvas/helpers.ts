import { v4 } from 'uuid';
//@CONSTANTS
import { INITIAL_STYLES, DUMMY_CONTENT } from '@/services/editor/constants';
import { DEFAULT_FORM_CONTENT, DEFAULT_STYLES } from './constants';
//@TYPES
import { InsertPositionType } from './types';
import { EditorElement, ElementTypes, Preset } from '../../types';

export const calculateInsertPosition = (
    children: Element[],
    mouse: number,
    direction: 'x' | 'y',
    elementId?: string,
): InsertPositionType | null => {
    let closestElement: Element | null = null;
    let minDistance = Infinity;

    for (let child of children) {
        if (!child.id) {
            continue;
        }
        if (elementId && child.id === elementId) {
            continue;
        }
        const rect = child.getBoundingClientRect();
        let distance: number;
        if (direction === 'x') {
            const centerX = rect.left + rect.width / 2;
            distance = Math.abs(mouse - centerX);
        } else {
            const centerY = rect.top + rect.height / 2;
            distance = Math.abs(mouse - centerY);
        }

        if (distance < minDistance) {
            minDistance = distance;
            closestElement = child;
        }
    }
    if (!closestElement) return null;

    let compare_to: number = 0;
    if (direction === 'x') {
        compare_to = closestElement.getBoundingClientRect().left + closestElement.getBoundingClientRect().width / 2;
    } else {
        compare_to = closestElement.getBoundingClientRect().top + closestElement.getBoundingClientRect().height / 2;
    }

    const value_to_update_position = mouse > compare_to ? 1 : 0;
    const newPosition = parseInt(closestElement.getAttribute('data-position') || '0') + value_to_update_position;
    return {
        id: closestElement.id,
        position: newPosition,
    };
};

export const fillPresetWithId = (item: Preset): EditorElement => {
    return {
        ...item,
        id: v4(),
        content: Array.isArray(item.content) ? item.content.map((c) => fillPresetWithId(c)) : item.content,
    } as EditorElement;
};

const generateContent = (type: ElementTypes): EditorElement['content'] => {
    if (type === 'container' || type === 'form') {
        return [];
    }

    return {
        ...(type === 'text' && { text: DUMMY_CONTENT['text'] }),
        ...(type === 'table' && { text: DUMMY_CONTENT['table'] }),
    };
};

export const createElement = (type: ElementTypes): EditorElement | null => {
    if (!type || !DEFAULT_FORM_CONTENT) return null;

    return {
        id: v4(),
        type,
        name: type,
        stylePerDevice: {
            desktop: {
                ...INITIAL_STYLES,
                ...DEFAULT_STYLES[type],
            },
            tablet: {
                ...INITIAL_STYLES,
                ...DEFAULT_STYLES[type],
            },
            mobile: {
                ...INITIAL_STYLES,
                ...DEFAULT_STYLES[type],
            },
        },
        globalStyle: true,
        content: generateContent(type),
        ...(type === 'form' && {
            formContent: {
                form: DEFAULT_FORM_CONTENT['form'],
            },
        }),
        ...(type === 'input' && {
            formContent: {
                input: DEFAULT_FORM_CONTENT['input'],
            },
        }),
        ...(type === 'radio' && {
            formContent: {
                radio_checkbox: DEFAULT_FORM_CONTENT['radio_checkbox'],
            },
        }),
        ...(type === 'checkbox' && {
            formContent: {
                radio_checkbox: DEFAULT_FORM_CONTENT['radio_checkbox'],
            },
        }),
    };
};
