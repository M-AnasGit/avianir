'use client';
import React from 'react';

type Props = {
    url: string;
    alt: string;
    style: React.CSSProperties;
};

export default function ImageElement({ url, alt, style }: Props) {
    const filtredStyle = React.useMemo(() => {
        let tempStyle = { ...style };

        delete tempStyle.width;
        delete tempStyle.height;

        delete tempStyle.marginTop;
        delete tempStyle.marginBottom;
        delete tempStyle.marginLeft;
        delete tempStyle.marginRight;

        switch (tempStyle.objectFit) {
            case 'cover':
                tempStyle.height = '100%';
                tempStyle.objectFit = 'cover';
                break;
            case 'contain':
                tempStyle.height = 'auto';
                tempStyle.objectFit = 'contain';
                break;
            default:
                tempStyle.height = '100%';
                tempStyle.objectFit = 'fill';
        }

        return tempStyle;
    }, [style]);

    return <img src={url} alt={alt} style={filtredStyle} />;
}
