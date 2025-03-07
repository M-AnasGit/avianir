import {
    Plus,
    SettingsIcon,
    SquareStackIcon,
    Box,
    Type,
    Database,
    Image,
    Clapperboard,
    Headphones,
    BookText,
    TextCursorInput,
    Circle,
    Check,
    Table,
    SlidersHorizontal,
    LucideIcon,
} from 'lucide-react';

import ContentTab from './tabs/content-tab';
import ConfigTab from './tabs/config-tab';
import ComponentsTab from './tabs/components-tab';
import LayersTab from './tabs/layers-tab';
import MediaTab from './tabs/media-tab';

import { ComponentTabItem } from './types';

export const SIDEBAR_TABS: Record<string, React.ReactNode> = {
    content: <ContentTab />,
    components: <ComponentsTab />,
    media: <MediaTab />,
    config: <ConfigTab />,
    layers: <LayersTab />,
};

export const SIDEBAR_TABS_ICONS: Record<string, React.ReactNode> = {
    content: <SlidersHorizontal />,
    components: <Plus />,
    media: <Database />,
    config: <SettingsIcon />,
    layers: <SquareStackIcon />,
};

export const COMPONENTS_TYPES_ICONS: Record<string, LucideIcon> = {
    text: Type,
    container: Box,
    table: Table,
    image: Image,
    video: Clapperboard,
    audio: Headphones,
    form: BookText,
    input: TextCursorInput,
    radio: Circle,
    checkbox: Check,
};

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
