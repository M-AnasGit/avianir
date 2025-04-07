export type User = {
    id: string;
    name: string;
    tokens_used: number;
    pfp: string;
    subscription_plan: 'free' | 'pro' | 'premium';
    created_at: string;
    updated_at: string;
};

export type Course = {
    chapters: Chapter[];
    course_created_at: string;
    course_id: string;
    course_name: string;
    course_updated_at: string;
    user_id: string;
};

export type Chapter = {
    chapter_created_at: string;
    chapter_id: string;
    chapter_name: string;
    chapter_updated_at: string;
};

export type uploadMediaType = {
    file: File;
    fileType: string;
    checksum: string;
};
