import { Database } from '@/db/database.types';

export type User = Database['public']['Tables']['user']['Row'];

export type UserDetails = {
    city?: string | null;
    occupation?: string | null;
    socials: {
        github?: string | undefined;
        twitter?: string | undefined;
        linkedin?: string | undefined;
        instagram?: string | undefined;
        website?: string | undefined;
        facebook?: string | undefined;
    };
    description?: string | null;
    languages: string[];
    fields: string[];
};

export type UserWithDetails = Omit<User, 'details'> & {
    details: UserDetails;
};

export type UserWithEmail = UserWithDetails & {
    email: string;
};

export type MediaType = 'image' | 'video' | 'audio';

export type Media = {
    id: string;
    name: string;
    type: MediaType;
    size: number;
};
