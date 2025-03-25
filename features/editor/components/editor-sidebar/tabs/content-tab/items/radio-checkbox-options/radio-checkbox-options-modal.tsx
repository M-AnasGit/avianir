'use client';
import React from 'react';
//@SHADCNUI
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
//@LUCIDE
import { Check, Plus, X } from 'lucide-react';
//@TYPES
import { RadioDetails } from '@/features/editor/types';
import { Toggle } from '@/components/ui/toggle';
type Props = {
    options: RadioDetails['options'] | undefined;
    isCheckbox: boolean;
    handleUpdateOptions: (options: RadioDetails['options']) => void;
};

export default function RadioCheckboxOptionsModal({ options, isCheckbox, handleUpdateOptions }: Props) {
    const [localOptions, setLocalOptions] = React.useState<RadioDetails['options'] | undefined>(options);
    const localStyle = React.useMemo(() => {
        if (!options)
            return {
                fontSize: '14px',
                lineHeight: '100%',
                color: 'var(--default-text)',
            };
        return options[0].value.style;
    }, [options]);

    const handleDeleteOption = (option_index: number) => {
        if (!localOptions) return;
        const new_options = localOptions.filter((_, i) => i !== option_index);
        setLocalOptions(new_options);
    };
    const handleRenameOption = (option_index: number, value: string) => {
        if (!localOptions) return;
        const new_options = localOptions.map((o, i) => {
            if (i === option_index) {
                return {
                    ...o,
                    value: {
                        ...o.value,
                        value,
                    },
                };
            }
            return o;
        });
        setLocalOptions(new_options);
    };
    const handleAddOption = () => {
        if (!localOptions) return;
        setLocalOptions([
            ...localOptions,
            {
                value: {
                    value: '',
                    style: localStyle,
                },
                is_default: false,
                correct: false,
            },
        ]);
    };
    const handleCorrectOption = (option_index: number, correct: boolean) => {
        if (!localOptions) return;
        const new_options = localOptions.map((o, i) => {
            if (i === option_index) {
                return {
                    ...o,
                    correct,
                };
            }
            return isCheckbox
                ? o
                : {
                      ...o,
                      correct: false,
                  };
        });
        setLocalOptions(new_options);
    };
    const handleDefaultOption = (option_index: number, is_default: boolean) => {
        if (!localOptions) return;
        const new_options = localOptions.map((o, i) => {
            if (i === option_index) {
                return {
                    ...o,
                    is_default,
                };
            }
            return isCheckbox
                ? o
                : {
                      ...o,
                      is_default: false,
                  };
        });
        setLocalOptions(new_options);
    };

    const closeBtnRef = React.useRef<HTMLButtonElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleUpdateOptions(localOptions || []);

        closeBtnRef.current?.click();
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Edit radio options</DialogTitle>
                <DialogDescription>Customize the radio options</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="no-scrollbar flex max-h-[300px] flex-col gap-4 overflow-y-auto">
                    {localOptions &&
                        localOptions.map((o, i) => {
                            return (
                                <div key={i} className="flex items-center justify-between gap-x-2 p-1">
                                    <Button
                                        type="button"
                                        variant={'ghost'}
                                        onClick={() => handleDeleteOption(i)}
                                        className="px-2"
                                    >
                                        <X className="text-destructive" />
                                    </Button>
                                    <Input
                                        name={`op-${i}`}
                                        placeholder="Option"
                                        type="text"
                                        defaultValue={o.value.value}
                                        onBlur={(e) => handleRenameOption(i, e.target.value)}
                                    />
                                    <div className="flex justify-end gap-x-8 pl-4">
                                        <Toggle pressed={o.correct} onPressedChange={(p) => handleCorrectOption(i, p)}>
                                            <Check size={16} style={{ color: 'var(--default-success-foreground' }} />
                                        </Toggle>
                                        <Toggle
                                            pressed={o.is_default}
                                            onPressedChange={(p) => handleDefaultOption(i, p)}
                                        >
                                            Default
                                        </Toggle>
                                    </div>
                                </div>
                            );
                        })}
                    <Button type="button" variant={'outline'} onClick={handleAddOption} className="w-full text-primary">
                        <Plus size={16} /> Add option
                    </Button>
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
