import React from 'react';
import { useFormContext } from 'react-hook-form';
//@SHADNCUI
import { Button } from '@/components/ui/button';
import { SelectWithSearch } from '@/components/ui/select-with-search';
//@ICONS
import { X } from 'lucide-react';

type Props = {
    id: 'languages' | 'fields';
    title: string;
    subtitle: string;
    data: { label: string; value: string }[];
    values: string[];
};

export default function ProfileSelect({ id, title, subtitle, data, values }: Props) {
    const { setValue } = useFormContext();
    const [selected, setSelected] = React.useState<string>('');
    const [localValues, setLocalValues] = React.useState<string[]>(values);

    const handleChangeSelected = (value: string) => {
        setSelected(value);
    };
    const handleRemoveValue = (lang: string) => {
        setLocalValues((prev) => prev.filter((l) => l !== lang));
    };

    const addBtnRef = React.useRef<HTMLButtonElement>(null);
    const handleAddValue = () => {
        setSelected('');
        setLocalValues((prev) => {
            if (prev.includes(selected)) {
                return prev;
            }
            return [...prev, selected];
        });
    };

    React.useEffect(() => {
        setValue(id, localValues);
    }, [localValues]);

    return (
        <div className="edit-profile-container min-h-[400px]">
            <div className="flex w-full flex-col gap-2">
                <h2 className="font-medium">{title}</h2>
                <p className="text-sm text-muted-foreground">{subtitle} </p>
            </div>
            <div className="flex w-full items-center gap-4">
                <SelectWithSearch data={data} value={selected} handleValueChange={handleChangeSelected} width="100%" />
                <Button aria-label={id} onClick={handleAddValue} ref={addBtnRef}>
                    Add
                </Button>
            </div>
            <div className="ml-2 flex flex-wrap gap-2">
                {localValues.length > 0 ? (
                    localValues.map((val, index) => (
                        <div
                            key={index}
                            className="flex min-w-[25px] max-w-fit items-center justify-between rounded-md border border-border bg-background pl-4 hover:bg-primary/25"
                        >
                            <span className="text-sm capitalize">{val}</span>
                            <Button
                                variant="ghost"
                                onClick={() => handleRemoveValue(val)}
                                className="hover:bg-transparent"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">No {id} added yet.</p>
                )}
            </div>
        </div>
    );
}
