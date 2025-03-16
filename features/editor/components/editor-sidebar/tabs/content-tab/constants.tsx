import Typography from './items/typography';
import Container from './items/container';
import Content from './items/content';
import Dimensions from './items/dimensions';
import Spacings from './items/spacings';
import Borders from './items/borders';
import Decorations from './items/decorations';

import FormTitle from './items/form-title';
import FormDescription from './items/form-description';
import FormButton from './items/form-button';

import { ElementTypes } from '@/features/editor/types';
import { SelectPresetType } from './types';

export const CONTENT_TAB_ITEMS: Record<
    string,
    {
        component: (props?: any) => React.ReactElement;
        for: Set<ElementTypes | '*'>;
    }
> = {
    typography: {
        component: () => <Typography />,
        for: new Set(['text', 'table']),
    },
    'form title': {
        component: () => <FormTitle />,
        for: new Set(['form']),
    },
    'form description': {
        component: () => <FormDescription />,
        for: new Set(['form']),
    },
    'form button': {
        component: () => <FormButton />,
        for: new Set(['form']),
    },
    container: {
        component: () => <Container />,
        for: new Set(['container']),
    },
    content: {
        component: ({ type }) => <Content type={type} />,
        for: new Set(['text', 'image', 'video', 'audio', 'table']),
    },
    dimensions: {
        component: () => <Dimensions />,
        for: new Set(['*']),
    },
    spacings: {
        component: () => <Spacings />,
        for: new Set(['*']),
    },
    borders: {
        component: () => <Borders />,
        for: new Set(['*']),
    },
    decorations: {
        component: () => <Decorations />,
        for: new Set(['*']),
    },
};

export const STYLES_DEFAULT_PRESETS: SelectPresetType[] = [
    {
        label: 'Custom',
        value: 'custom',
    },
];
