'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@COMPONENTS
import RichContent from '@/components/rich-content';
//@TYPES
import { EditorElement, FormDetails } from '@/services/editor/types';

type Props = React.PropsWithChildren & {
    content: EditorElement[];
    formDetails: FormDetails;
    style: React.CSSProperties;
    preset?: boolean;
};

export default function FormContainer({ children, content, style, formDetails, preset }: Props) {
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
        <form style={filtredStyle} data-property="form-container">
            <legend className="pb-1">
                <RichContent content={formDetails.title.value} style={formDetails.title.style} />
            </legend>
            {formDetails.description && (
                <RichContent content={formDetails.description.value} style={formDetails.description.style} />
            )}
            <div className="flex flex-col gap-2 pb-4" id="form-elements">
                {children}
            </div>

            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: formDetails.submit_btn.style['justifyContent'],
                }}
            >
                <Button
                    type="submit"
                    className="w-fit"
                    onClick={(e) => e.preventDefault()}
                    style={formDetails.submit_btn.style}
                >
                    {formDetails.submit_btn.value}
                </Button>
            </div>
        </form>
    );
}
