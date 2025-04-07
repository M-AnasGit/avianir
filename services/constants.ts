import { MediaType } from './types';

export const MAX_SIZES: Record<string, number> = {
    image: 5 * 1024 * 1024,
    video: 1 * 1024 * 1024 * 1024,
    audio: 50 * 1024 * 1024,
};

export const INPUT_FILE_TYPES: Record<MediaType, string> = {
    image: 'image/webp, image/avif, image/jpeg, image/png',
    video: 'video/webm, video/mp4',
    audio: 'audio/ogg, audio/mp3, audio/aac',
};
