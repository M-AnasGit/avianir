'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
//@SERVER ACTIONS
import { createPublicPreset, getPublicPresets, deletePublicPreset } from '../server-actions/public-preset-data';
//@CUSTOM HOOKS
import { useToast } from '@/hooks/use-toast';
//@Types
import { Preset } from '../types';

export type UsePublicPresetDataReturnType = ReturnType<typeof usePublicPresetData>;

export const usePublicPresetData = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const {
        data: publicPresets,
        isError: isPublicPresetsError,
        isLoading: isPublicPresetsLoading,
        refetch: refetchPublicPresets,
    } = useQuery({
        queryKey: ['publicPresets'],
        queryFn: () => getPublicPresets(),
        retry: 3,
        enabled: false,
    });

    const createPublicPresetMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Preset | undefined }) => createPublicPreset(id, data),
        onMutate: () => {
            toast({
                title: 'Creating...',
                description: 'Your changes are being saved.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Creation Successful',
                description: 'Your public preset has been created.',
            });
            queryClient.invalidateQueries({
                queryKey: ['publicPresets'],
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Creation Failed',
                description: 'There was an error creating your public preset. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const deletePublicPresetMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => deletePublicPreset(id),
        onMutate: () => {
            toast({
                title: 'Deleting...',
                description: 'Your changes are being saved.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Deletion Successful',
                description: 'Your public preset has been deleted.',
            });
            queryClient.invalidateQueries({
                queryKey: ['publicPresets'],
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Deletion Failed',
                description: 'There was an error deleting your public preset. Please try again.',
                variant: 'destructive',
            });
        },
    });

    return {
        publicPresets: publicPresets,
        createPublicPresetMutation,
        deletePublicPresetMutation,
        refetchPublicPresets,
        isLoading: isPublicPresetsLoading,
        isError: isPublicPresetsError,
    };
};
