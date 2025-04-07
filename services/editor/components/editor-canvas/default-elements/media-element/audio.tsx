'use client';
import React from 'react';
//@SHADCNUI
import { Card, CardContent } from '@/components/ui/card';
//@CUSTOM COMPONENTS
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

type Props = {
    url: string;
    style: React.CSSProperties;
};

export default function AudioElement({ url, style }: Props) {
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

    return (
        <Card style={filtredStyle}>
            <CardContent className="pt-6">
                <AudioPlayer src={url} className="border-0 !p-0 !shadow-none" showJumpControls={false} />
            </CardContent>
        </Card>
    );
}
