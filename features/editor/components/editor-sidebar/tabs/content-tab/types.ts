import { FormDetails, InputDetails, RadioDetails } from '@/features/editor/types';

export type ElementChangeEvent = {
    target: {
        id: string;
        value: string;
    };
};

export type FormElementChange = {
    target: {
        id: string;
        value: FormDetails | InputDetails | RadioDetails;
    };
};

export type SelectPresetType = {
    label: string;
    value: string;
};
