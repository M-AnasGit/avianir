import { ComponentTabItem } from '../types';

export const COMPONENTS_TAB_ITEMS: Record<string, ComponentTabItem[]> = {
    default: [
        {
            name: 'Text',
            type: 'text',
        },
        {
            name: 'Container',
            type: 'container',
        },
        {
            name: 'Table',
            type: 'table',
        },
        {
            name: 'Image',
            type: 'image',
        },
        {
            name: 'Video',
            type: 'video',
        },
        {
            name: 'Audio',
            type: 'audio',
        },
    ],
    form: [
        {
            name: 'Form',
            type: 'form',
        },
        {
            name: 'input',
            type: 'input',
        },
        {
            name: 'radio',
            type: 'radio',
        },
        {
            name: 'checkbox',
            type: 'checkbox',
        },
    ],
};
