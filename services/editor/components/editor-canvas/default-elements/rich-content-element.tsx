'use client';
import React from 'react';
import RichContent from '@/components/rich-content';

type Props = {
    style: React.CSSProperties;
    content: {
        text?: string;
        href?: string;
    };
};

export default function RichContentElement({ style, content }: Props) {
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

    return <RichContent content={content.text || ''} style={filtredStyle} />;
}
