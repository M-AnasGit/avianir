'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import ElementSkeleton from '../provider/element-skeleton';
//@TYPES
import { EditorElement } from '@/features/editor/types';

type Props = {
    style: React.CSSProperties;
    content: EditorElement[];
};

export default function ContainerElement({ style, content }: Props) {
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
                return <ElementSkeleton key={ele.id} index={i} ele={ele} flexDirection={flexDirection} />;
            })}
        </div>
    );
}
