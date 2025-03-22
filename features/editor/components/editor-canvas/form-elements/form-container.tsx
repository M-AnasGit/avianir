'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@COMPONENTS
import RichContent from '@/components/rich-content';
//@TYPES
import { EditorElement, FormDetails } from '@/features/editor/types';
import ElementSkeleton from '../base/element-skeleton';
type Props = {
    content: EditorElement[];
    formDetails: FormDetails;
    style: React.CSSProperties;
};

export default function FormContainer({ content, style, formDetails }: Props) {
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
                {content.map((ele, i) => {
                    return <ElementSkeleton key={ele.id} index={i} ele={ele} flexDirection={'column'} />;
                })}
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
