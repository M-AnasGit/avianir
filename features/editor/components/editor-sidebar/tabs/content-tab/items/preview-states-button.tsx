'use client';
import React from 'react';
import InputStates from '@/components/input-states';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//@LUCIDE REACT
import { Eye } from 'lucide-react';
//@CUSTOM HOOKS
import { useModal } from '@/components/providers/modal-provider';
import { useEditor } from '@/features/editor/provider';

export default function PreviewStatesButton() {
    const { palette } = useEditor();
    const { handleSetModal } = useModal();

    const handlePreviewModal = () => {
        handleSetModal(<PreviewModal palette={palette} />);
    };

    return (
        <Button variant={'outline'} onClick={handlePreviewModal} className="text-primary" data-testid="edit-content">
            <Eye size={16} />
            Preview states
        </Button>
    );
}

type Props = {
    palette: Palette;
};

function PreviewModal({ palette }: Props) {
    const [activeTab, setActiveTab] = React.useState<InputStates>('success');

    const handleActiveTab = (tab: string) => {
        setActiveTab(tab as InputStates);
    };

    return (
        <>
            <DialogHeader className="gap-1 space-y-0">
                <DialogTitle>Preview input state</DialogTitle>
                <DialogDescription>Preview the sucess, error and warning states of the input field.</DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} className="mx-auto w-[300px]" onValueChange={handleActiveTab}>
                <TabsList>
                    <TabsTrigger value="success" className="min-w-[90px]">
                        Sucess
                    </TabsTrigger>
                    <TabsTrigger value="error" className="min-w-[90px]">
                        Error
                    </TabsTrigger>
                    <TabsTrigger value="warning" className="min-w-[90px]">
                        Warning
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <InputStates
                state={activeTab}
                backgroundColor={palette.default[`${activeTab} background`].light}
                foregroundColor={palette.default[`${activeTab} foreground`].light}
            />
        </>
    );
}
