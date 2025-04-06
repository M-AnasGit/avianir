'use client';
import { useMutation } from '@tanstack/react-query';
import { downloadAsset } from '@/server-actions/assets';

const useAsset = () => {
    const getAssetMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => downloadAsset(`editor-assets/${id}`),
        onError: (error) => {
            console.error('Error while fetching media', error);
            return null;
        },
    });

    return {
        getAssetMutation,
    };
};
export default useAsset;
