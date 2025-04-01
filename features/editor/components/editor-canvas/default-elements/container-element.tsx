'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import ElementSkeleton from '../base/element-skeleton';
import ElementFactory from '../base/element-factory';
//@TYPES
import { EditorElement } from '@/features/editor/types';

type Props = {
    style: React.CSSProperties;
    content: EditorElement[];
    preset?: boolean;
};

export default function ContainerElement({ style, content, preset }: Props) {
    const flexDirection = React.useMemo(() => {
        return style.flexDirection;
    }, [style]);

    return (
        <div
            className="h-full w-full"
            data-property="container"
            style={{
                ...style,
            }}
        >
            {content.map((ele, i) => {
                return preset ? (
                    <React.Fragment key={i}>{ElementFactory.renderElement(ele, 'desktop', true)}</React.Fragment>
                ) : (
                    <ElementSkeleton key={ele.id} index={i} ele={ele} flexDirection={flexDirection} />
                );
            })}
        </div>
    );
}
