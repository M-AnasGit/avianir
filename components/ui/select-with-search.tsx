'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
    data: {
        label: string;
        value: string;
    }[];
    value: string;
    handleValueChange: (value: string) => void;
    width?: string;
};

export function SelectWithSearch({ data, value, handleValueChange, width }: Props) {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    style={{
                        width: width ? width : '200px',
                    }}
                    ref={triggerRef}
                >
                    <span className="w-[100px] truncate text-left capitalize">
                        {value ? data.find((d) => d.value === value)?.label : 'Select...'}
                    </span>

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
                style={{
                    width: triggerRef.current?.offsetWidth,
                }}
            >
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((d) => (
                                <CommandItem
                                    key={d.value}
                                    value={d.value}
                                    onSelect={(currentValue) => {
                                        handleValueChange(currentValue);
                                        setOpen(false);
                                    }}
                                    className="capitalize"
                                >
                                    <Check
                                        className={cn('mr-2 h-4 w-4', value === d.value ? 'opacity-100' : 'opacity-0')}
                                    />
                                    {d.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
