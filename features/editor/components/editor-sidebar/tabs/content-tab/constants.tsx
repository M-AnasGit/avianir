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

import InputLabel from './items/input-label';
import InputArea from './items/input-area';
import InputConfig from './items/input-config';

import RadioCheckboxLabel from './items/radio-checkbox-label';
import RadioCheckboxOptions from './items/radio-checkbox-options';

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
    'input label': {
        component: () => <InputLabel />,
        for: new Set(['input']),
    },
    'input area': {
        component: () => <InputArea />,
        for: new Set(['input']),
    },
    'input config': {
        component: () => <InputConfig />,
        for: new Set(['input']),
    },
    'radio label': {
        component: () => <RadioCheckboxLabel />,
        for: new Set(['radio']),
    },
    'radio options': {
        component: () => <RadioCheckboxOptions />,
        for: new Set(['radio']),
    },
    'checkbox label': {
        component: () => <RadioCheckboxLabel />,
        for: new Set(['checkbox']),
    },
    'checkbox options': {
        component: () => <RadioCheckboxOptions />,
        for: new Set(['checkbox']),
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
