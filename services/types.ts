export type User = {
    id: string;
    name: string;
    tokens_used: number;
    pfp: string;
    subscription_plan: 'free' | 'pro' | 'premium';
    created_at: string;
    updated_at: string;
};

export type MediaType = 'image' | 'video' | 'audio';

export type Media = {
    id: string;
    name: string;
    type: MediaType;
    size: number;
};
