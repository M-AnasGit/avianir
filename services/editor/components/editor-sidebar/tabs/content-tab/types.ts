import { FormDetails, InputDetails, RadioDetails } from '@/services/editor/types';

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
