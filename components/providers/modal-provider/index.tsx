'use client';
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type ModalContextType = {
    modal: React.ReactNode | null;
    handleSetModal: (modal: React.ReactNode) => void;
    handleRemoveModal: () => void;
};

const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = React.useState<React.ReactNode>(null);

    const handleSetModal = React.useCallback((modal: React.ReactNode) => {
        setModal(modal);
    }, []);

    const handleRemoveModal = React.useCallback(() => {
        setModal(null);
    }, []);

    return (
        <ModalContext.Provider value={{ modal, handleSetModal, handleRemoveModal }}>
            {children}
            <Dialog open={!!modal} onOpenChange={handleRemoveModal}>
                <DialogContent>{modal}</DialogContent>
            </Dialog>
        </ModalContext.Provider>
    );
};

export default ModalProvider;

export const useModal = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
