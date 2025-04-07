'use client';
import React from 'react';
import { v4 } from 'uuid';
import RenderElementComponent from './editor-canvas/render-element';
//@TYPES
import { EditorElement, Preset } from '../types';
type Props = {
    preset: Preset;
};

const fillPresetWithId = (preset: Preset | EditorElement): EditorElement => {
    return {
        ...preset,
        id: v4(),
        content: Array.isArray(preset.content)
            ? preset.content.map((ele) => ({
                  ...ele,
                  id: v4(),
                  content: Array.isArray(ele.content) ? ele.content.map((e) => fillPresetWithId(e)) : ele.content,
              }))
            : preset.content,
    } as EditorElement;
};

export default function PreviewPreset({ preset }: Props) {
    const ele: EditorElement = React.useMemo(() => {
        return {
            id: v4(),
            ...preset,
            content: Array.isArray(preset.content) ? preset.content.map((e) => fillPresetWithId(e)) : preset.content,
        } as EditorElement;
    }, [preset]);

    return <RenderElementComponent index={0} element={ele} activeDevice="desktop" preset={true} />;
}
