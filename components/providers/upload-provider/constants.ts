export const DROPZONE_ACCEPTED_TYPES: Record<string, Record<string, string[]>> = {
    image: {
        'image/webp': ['.webp'],
        'image/avif': ['.avif'],
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
    },
    video: {
        'video/mp4': ['.mp4'],
        'video/mpeg': ['.mpeg'],
        'video/webm': ['.webm'],
    },
    audio: {
        'audio/mpeg': ['.mp3'],
        'audio/wav': ['.wav'],
        'audio/webm': ['.webm'],
        'audio/flac': ['.flac'],
        'audio/x-m4a': ['.m4a'],
    },
};
