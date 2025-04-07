'use client';
import React from 'react';
import RichContent from '@/components/rich-content';
//@TYPES
import { InputDetails } from '@/services/editor/types';
type Props = {
    id: string;
    inputDetails: InputDetails;
    style: React.CSSProperties;
};

export default function FormInput({ id, inputDetails, style }: Props) {
    return (
        <div style={style}>
            <label htmlFor={`input-${id}`}>
                <RichContent content={inputDetails.label.value} style={inputDetails.label.style} />
            </label>
            <textarea
                id={`input-${id}`}
                placeholder={inputDetails.placeholder.value}
                className="resize-none shadow-sm"
                style={inputDetails.placeholder.style}
                rows={inputDetails.config.rows}
            />
        </div>
    );
}
