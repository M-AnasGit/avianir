'use client';
import React from 'react';
//@LUCIDE ICONS
import { Moon, Plus, Sun, X } from 'lucide-react';
//@SHADCN UI
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
//@TYPES
import { Palette } from '@/features/editor/types';
import { Input } from '@/components/ui/input';
import { ColorPicker } from '@/components/ui/colorpicker';
type Props = {
    isDefault?: boolean;
    palette: Palette;
    updateCourseData: (id: string, data: Palette) => Promise<void>;
};

export default function EditPaletteModal({ isDefault, palette, updateCourseData }: Props) {
    const [localPalette, setLocalPalette] = React.useState<Palette['custom']>(
        isDefault ? palette.default : palette.custom,
    );

    const handleRenameColor = (key: string, newName: string) => {
        setLocalPalette((prev) => {
            const { [key]: color, ...rest } = prev;
            return { ...rest, [newName]: color };
        });
    };

    const handleChangeColor = (key: string, color: string, type: 'light' | 'dark') => {
        setLocalPalette((prev) => ({
            ...prev,
            [key]: { ...prev[key], [type]: color },
        }));
    };

    const handleAddColor = () => {
        setLocalPalette((prev) => {
            let newColorKey = 'new color';
            let isNewColor = prev[newColorKey] !== undefined;
            while (isNewColor) {
                newColorKey = `new color ${Math.floor(Math.random() * 1000)}`;
                isNewColor = prev[newColorKey] !== undefined;
            }
            return { ...prev, [newColorKey]: { light: '#ffffff', dark: '#000000' } };
        });
    };

    const handleDeleteColor = (key: string) => {
        setLocalPalette((prev) => {
            const { [key]: _, ...rest } = prev;
            return rest;
        });
    };

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const groupedColors: Palette['custom'] = {};
        Object.entries(localPalette).forEach(([key]) => {
            groupedColors[key] = {
                light: formData.get(`${key}-light`) as string,
                dark: formData.get(`${key}-dark`) as string,
            };
        });

        const newPalette = {
            ...palette,
            ...(isDefault ? { default: groupedColors } : { custom: groupedColors }),
        } as Palette;

        await updateCourseData('palette', newPalette);
        closeBtnRef.current?.click();
    };

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Edit palette</DialogTitle>
                <DialogDescription>Edit the palette colors for the current theme</DialogDescription>
            </DialogHeader>
            <span className="flex justify-end gap-x-8 px-1 text-muted-foreground">
                <Sun size={24} />
                <Moon size={24} />
            </span>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="no-scrollbar flex max-h-[300px] flex-col gap-4 overflow-y-auto">
                    {Object.entries(localPalette).map(([key, color], _) => {
                        return (
                            <div key={key} className="flex items-center justify-between gap-x-2 p-1">
                                {!isDefault && (
                                    <Button
                                        type="button"
                                        variant={'ghost'}
                                        onClick={() => handleDeleteColor(key)}
                                        className="px-2"
                                    >
                                        <X className="text-destructive" />
                                    </Button>
                                )}

                                <Input
                                    name={`${key}-name`}
                                    placeholder="Color name"
                                    type="text"
                                    defaultValue={key}
                                    onBlur={(e) => handleRenameColor(key, e.target.value)}
                                    disabled={isDefault}
                                />
                                <div className="flex justify-end gap-x-8 pl-4">
                                    <ColorPicker
                                        value={color.light}
                                        className="size-6"
                                        onChange={(color) => handleChangeColor(key, color, 'light')}
                                    />
                                    <input type="hidden" name={`${key}-light`} value={color.light} />

                                    <ColorPicker
                                        value={color.dark}
                                        className="size-6"
                                        onChange={(color) => handleChangeColor(key, color, 'dark')}
                                    />
                                    <input type="hidden" name={`${key}-dark`} value={color.dark} />
                                </div>
                            </div>
                        );
                    })}
                    {!isDefault && (
                        <Button
                            type="button"
                            variant={'outline'}
                            onClick={handleAddColor}
                            className="w-full text-primary"
                        >
                            <Plus size={16} /> Add color
                        </Button>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button ref={closeBtnRef} type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </form>
        </>
    );
}
