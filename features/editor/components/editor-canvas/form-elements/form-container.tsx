'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@COMPONENTS
import RichContent from '@/components/rich-content';
//@TYPES
import { FormDetails } from '@/features/editor/types';
type Props = {
    formDetails: FormDetails;
    style: React.CSSProperties;
};

export default function FormContainer({ style, formDetails }: Props) {
    const filtredStyle = React.useMemo(() => {
        let tempStyle = { ...style };

        delete tempStyle.width;
        delete tempStyle.height;

        delete tempStyle.marginTop;
        delete tempStyle.marginBottom;
        delete tempStyle.marginLeft;
        delete tempStyle.marginRight;

        return tempStyle;
    }, [style]);

    return (
        <form style={filtredStyle}>
            <legend className="pb-1">
                <RichContent content={formDetails.title.value} style={formDetails.title.style} />
            </legend>
            {formDetails.description && (
                <RichContent content={formDetails.description.value} style={formDetails.description.style} />
            )}
            <div className="flex flex-col gap-2 pb-4"></div>
            <Button
                type="submit"
                className="w-fit"
                onClick={(e) => e.preventDefault()}
                style={formDetails.submit_btn.style}
            >
                {formDetails.submit_btn.value}
            </Button>
        </form>
    );
}
