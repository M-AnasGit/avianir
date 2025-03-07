'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import ImageElement from './image';
import VideoElement from './video';
import AudioElement from './audio';
//@LUCIDE REACT
import { Loader2 } from 'lucide-react';
//@CUSTOM HOOK
import { useEditor } from '@/features/editor/provider';
import { useUser } from '@/features/user/provider';

type Props = {
    mediaType: 'image' | 'video' | 'audio';
    style: React.CSSProperties;
    content: {
        src?: string;
        alt?: string;
    };
};

export default function MediaElement({ mediaType, style, content }: Props) {
    const { state } = useEditor();
    const { downloadMedia } = useUser();

    const [url, setUrl] = React.useState<string | null>(null);
    React.useEffect(() => {
        const fetchDownload = async () => {
            const url = await downloadMedia(content.src ?? '');

            if (url) {
                setUrl(url);
            } else {
                console.error('Error while fetching media');
            }
        };

        if (content.src) {
            fetchDownload();
        }
    }, []);

    return url ? (
        mediaType === 'image' ? (
            <ImageElement url={url} alt={content.alt ?? ''} style={style} />
        ) : mediaType === 'video' ? (
            <VideoElement url={url} preview={state.editor.preview} style={style} />
        ) : mediaType === 'audio' ? (
            <AudioElement url={url} style={style} />
        ) : null
    ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <Loader2 size={32} className="animate-spin" />
        </div>
    );
}
