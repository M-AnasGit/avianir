'use client';
import { useMutation } from '@tanstack/react-query';
import { downloadAsset } from '@/server-actions/assets';

const getCachedAssetUrl = (id: string) => {
    const cached = localStorage.getItem(`asset-url-${id}`);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const now = Date.now();

    if (now > parsed.expiry) {
        localStorage.removeItem(`asset-url-${id}`);
        return null;
    }

    return parsed.url;
};

const cacheAssetUrl = (id: string, url: string, ttlMs: number) => {
    const expiry = Date.now() + ttlMs;
    localStorage.setItem(`asset-url-${id}`, JSON.stringify({ url, expiry }));
};

const useAsset = () => {
    const getAssetMutation = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const cachedUrl = getCachedAssetUrl(id);
            if (cachedUrl) return cachedUrl;

            const url = await downloadAsset(`editor-assets/${id}`);
            if (url) {
                cacheAssetUrl(id, url, 1000 * 60 * 60 * 24 * 30);
            }
            return url;
        },
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
