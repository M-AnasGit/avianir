import { startsWith } from 'lodash';

export const renderSize = (size: number) => {
    let renderedSize: string;

    if (size < 1000) {
        renderedSize = `${size} B`;
    } else if (size < 1000000) {
        renderedSize = `${(size / 1000).toFixed(2)} KB`;
    } else {
        renderedSize = `${(size / 1000000).toFixed(2)} MB`;
    }

    return renderedSize;
};

export const generateChecksum = async (file: File | null) => {
    if (!file) return '';

    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const convertFileType = (fileType: string): 'image' | 'video' | 'audio' => {
    if (fileType.startsWith('image')) {
        return 'image';
    } else if (fileType.startsWith('video')) {
        return 'video';
    }
    return 'audio';
};
