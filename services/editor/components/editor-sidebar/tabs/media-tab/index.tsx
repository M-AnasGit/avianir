'use client';
import React from 'react';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
//@CUSTOM COMPONENTS
import UploadModal from './upload-modal';
import MediaCard from './media-card';
import GenericModal from '@/components/generic-modal';
import UpdateModal from './update-modal';
//@CUSTOM HOOKS
import { useUser } from '@/services/user/provider';
import { useModal } from '@/components/providers/modal-provider';

export default function MediaTab() {
    const { media, canUpload, deleteMedia } = useUser();
    const { handleSetModal } = useModal();
    const currentSize = React.useMemo(
        () => parseFloat((media.reduce((acc, item) => acc + item.size, 0) / 1000000).toFixed(2)),
        [media],
    );

    const handleUploadClick = () => {
        if (!canUpload) return;
        handleSetModal(<UploadModal />);
    };
    const handleDeleteFile = (id: string) => {
        handleSetModal(
            <GenericModal
                title="Delete media"
                description="Are you sure you want to delete this item? This action cannot be undone."
                btn_text="Delete"
                btn_action={() => deleteMedia(id)}
            />,
        );
    };
    const handleUpdateFile = (id: string) => {
        handleSetModal(<UpdateModal id={id} />);
    };

    return (
        <div className="flex flex-col gap-4">
            {media?.map((item, index) => (
                <MediaCard
                    key={index}
                    item={item}
                    handleCardClick={() => handleUpdateFile(item.id)}
                    handleDeleteFile={() => handleDeleteFile(item.id)}
                />
            ))}
            <div className="flex items-center gap-x-2">
                <Progress value={currentSize} max={2000} />
                <small className="flex-shrink-0 text-xs">{currentSize} MB</small>
            </div>
            <Button aria-label={`Upload Media`} onClick={handleUploadClick} className="w-full" disabled={!canUpload}>
                Upload Media ({media && media.length})
            </Button>
        </div>
    );
}
