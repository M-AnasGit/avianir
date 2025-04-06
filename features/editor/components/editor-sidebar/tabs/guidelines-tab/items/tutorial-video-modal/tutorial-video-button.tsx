'use client';
import React from 'react';
import TutorialVideoModal from '.';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@LUCIDEICONS
import { Eye } from 'lucide-react';
//@CUSTOM HOOKS
import { useModal } from '@/components/providers/modal-provider';

type Props = {
    src: string;
};

export default function TutorialVideoButton({ src }: Props) {
    const url = React.useMemo(() => {
        return src;
    }, [src]);
    const { handleSetModal } = useModal();

    const handleOpenTutorialVideoModal = () => {
        handleSetModal(<TutorialVideoModal url={url} />);
    };

    return (
        <Button variant="outline" className="w-full" onClick={handleOpenTutorialVideoModal}>
            <Eye size={16} className="mr-2" />
            Tutorial Video
        </Button>
    );
}
