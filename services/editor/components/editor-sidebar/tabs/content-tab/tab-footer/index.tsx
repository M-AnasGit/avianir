'use client';
import React from 'react';
//@SHADCNUI
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
//@CUSTOM COMPONENTS
import SelectWithButton from '../items/select-with-button';
import GenericModal from '@/components/generic-modal';
import SaveModal from './save-modal';
//@CONSTANTS
import { STYLES_DEFAULT_PRESETS } from '../constants';
//@PROVIDER
import { useContent } from '../provider';
import { useModal } from '@/components/providers/modal-provider';
import { useEditor } from '@/services/editor/provider';
//@TYPES
import { SelectPresetType } from '../types';

export default function TabFooter() {
    const { state, presets, updateCourseData } = useEditor();
    const { handleSetModal } = useModal();
    const { sameConfigAcrossDevices, handleChangeConfigAcrossDevices, handleDelete, handleApplyPreset } = useContent();

    const labeled_presets = React.useMemo<SelectPresetType[]>(
        () =>
            presets.map((preset) => ({
                label: preset.name,
                value: preset.name,
            })),
        [presets],
    );
    const selectedPreset = React.useMemo(
        () => state.editor.selectedElement?.preset ?? 'custom',
        [state.editor.selectedElement?.preset],
    );

    const handleLocalChangeSelectedPreset = (value: string) => {
        const preset = presets.find((preset) => preset.name === value);

        let modal = (
            <GenericModal
                title="Incompatible preset"
                description={`The selected preset works for ${preset?.type} elements only. The current element is ${state.editor.selectedElement?.type}.`}
                btn_text="Continue"
                btn_action={() => {}}
            />
        );

        if (preset && preset.type === state.editor.selectedElement?.type) {
            modal = (
                <GenericModal
                    title="Are you sure?"
                    description="This action will override the current element's style with the selected preset."
                    btn_text="Continue"
                    btn_action={() => handleApplyPreset(preset)}
                />
            );
        }

        handleSetModal(modal);
    };
    const handleLocalDeleteClick = () => {
        handleSetModal(
            <GenericModal
                title="Delete item"
                description="Are you sure you want to delete this item?"
                btn_text="Delete"
                btn_action={handleDelete}
            />,
        );
    };
    const handleLocalSaveClick = () => {
        handleSetModal(
            <SaveModal
                selectedElement={state.editor.selectedElement}
                presets={presets}
                updateCourseData={updateCourseData}
            />,
        );
    };

    return (
        <div className="mt-4 flex flex-col gap-4">
            {state.editor.selectedElementId && state.editor.selectedElementId !== '_body' && (
                <Button className="w-full" onClick={handleLocalDeleteClick} variant="destructive">
                    Delete item
                </Button>
            )}

            <SelectWithButton
                selected={selectedPreset}
                data={[...labeled_presets, ...STYLES_DEFAULT_PRESETS]}
                btnLabel="Save"
                handleChangeSelected={handleLocalChangeSelectedPreset}
                action={handleLocalSaveClick}
            />
            <span className="flex items-center gap-2 px-[2px] pt-2">
                <Checkbox
                    checked={sameConfigAcrossDevices}
                    onCheckedChange={handleChangeConfigAcrossDevices}
                    aria-label="Use the same size for all devices"
                />
                <small className="prop-small">Use the same size for all devices</small>
            </span>
        </div>
    );
}
