'use client';
import React from 'react';

type Props = {
    url: string;
    preview: boolean;
    style: React.CSSProperties;
};

export default function VideoElement({ url, preview, style }: Props) {
    const filtredStyle = React.useMemo(() => {
        let tempStyle = { ...style };

        delete tempStyle.marginTop;
        delete tempStyle.marginBottom;
        delete tempStyle.marginLeft;
        delete tempStyle.marginRight;

        return {
            ...tempStyle,
            height: '100%',
            width: '100%',
        };
    }, [style]);

    return <video src={url} style={filtredStyle} controls={preview} />;
}
