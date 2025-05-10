import React from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
    avatarUrl: string;
    handleSaveAvatar: (url: string, crop: Area) => void;
};

export default function AvatarModal({ avatarUrl, handleSaveAvatar }: Props) {
    const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area>({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    });

    const onCropComplete = React.useCallback((_: Area, croppedAreaPixels: Area): void => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const closeBtn = React.useRef<HTMLButtonElement>(null);

    const handleLocalSaveAvatar = () => {
        handleSaveAvatar(avatarUrl, croppedAreaPixels);
        closeBtn.current?.click();
    };

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Profile picture</DialogTitle>
                <DialogDescription>Crop your profile picture to fit the required dimensions.</DialogDescription>
            </DialogHeader>
            <div className="relative h-[200px] rounded-lg">
                <Cropper
                    image={avatarUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" ref={closeBtn}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button onClick={() => handleLocalSaveAvatar()}>Save</Button>
            </DialogFooter>
        </>
    );
}
