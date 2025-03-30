'use client';
import DisplayPalette from './display-palette';
import EditPaletteModal from './edit-palette/edit-palette-modal';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@LUCIDE ICONS
import { Pencil } from 'lucide-react';
//@CUSTOM HOOKS
import { useEditor } from '@/features/editor/provider';
import { useModal } from '@/components/providers/modal-provider';
import React from 'react';
//@TYPES
type Props = {
    isDefault?: boolean;
};

export default function PaletteTab({ isDefault }: Props) {
    const { palette, updateCourseData } = useEditor();
    const currentPalette = React.useMemo(() => palette[isDefault ? 'default' : 'custom'], [palette, isDefault]);

    const { handleSetModal } = useModal();
    const handleEditPalette = () => {
        handleSetModal(
            <EditPaletteModal isDefault={isDefault} palette={palette} updateCourseData={updateCourseData} />,
        );
    };

    return (
        <>
            <DisplayPalette palette={currentPalette} />
            <Button variant={'outline'} onClick={handleEditPalette} className="w-full text-primary">
                <Pencil size={16} />
                Edit palette
            </Button>
        </>
    );
}
