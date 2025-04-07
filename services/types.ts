export type MediaType = 'image' | 'video' | 'audio';

export type Media = {
    id: string;
    name: string;
    type: MediaType;
    size: number;
};
