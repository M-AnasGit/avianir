'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import Layer from './layer';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';

export default function LayersTab() {
    const { state } = useEditor();

    if (state.editor.elementsMap.size <= 1) {
        return (
            <p className="prop-small" role="alert">
                Add elements to the canvas
            </p>
        );
    }

    return (
        <div className="w-[280px]">
            {Array.isArray(state.editor.elements[0].content) &&
                state.editor.elements[0].content.map((ele, i) => <Layer key={i} ele={ele} />)}
        </div>
    );
}
