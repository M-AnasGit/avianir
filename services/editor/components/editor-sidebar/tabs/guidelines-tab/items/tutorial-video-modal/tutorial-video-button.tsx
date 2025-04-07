'use client';
import React from 'react';
import TutorialVideoModal from '.';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@LUCIDEICONS
import { Eye } from 'lucide-react';
//@CUSTOM HOOKS
import { useModal } from '@/components/providers/modal-provider';
import useAsset from '@/hooks/use-assets';

type Props = {
    src: string;
};

export default function TutorialVideoButton({ src }: Props) {
    const { getAssetMutation } = useAsset();

    const [url, setUrl] = React.useState<string | null>(null);
    React.useEffect(() => {
        const fetchDownload = async () => {
            const url = await getAssetMutation.mutateAsync({ id: `${src.toUpperCase()}.gif` });

            if (url) {
                setUrl(url);
            } else {
                console.error('Error while fetching media');
            }
        };

        if (src) {
            fetchDownload();
        } else {
            setUrl(null);
        }
    }, [src]);
    const { handleSetModal } = useModal();

    const handleOpenTutorialVideoModal = () => {
        handleSetModal(<TutorialVideoModal url={url} />, 1200);
    };

    return (
        <Button variant="outline" className="w-full" onClick={handleOpenTutorialVideoModal}>
            <Eye size={16} className="mr-2" />
            Tutorial Video
        </Button>
    );
}
