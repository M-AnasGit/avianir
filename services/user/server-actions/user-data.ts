'use server';
import fs from 'fs';
import { v4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl as getS3SignedUrl } from '@aws-sdk/s3-request-presigner';
import { getSignedUrl as getCloudFrontSignedUrl } from '@aws-sdk/cloudfront-signer';
//@SUPABASE
import serverClient from '@/db/server';
//@CONSTANTS
import { INPUT_FILE_TYPES, MAX_SIZES } from '@/services/constants';
import { PROFILE_PICTURE_LIMIT } from '../constants';
//@TYPES
import { Chapter, Course } from '../types';
import { Media, User, UserWithEmail, UserWithDetails } from '@/services/types';

export const getUserData = async (user_id: string) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');

    const supabase = await serverClient();
    const { data: user, error } = await supabase.from('user').select<'*'>('*').eq('id', user_id).single();
    if (error) throw new Error('Error fetching user details');

    return user as UserWithDetails;
};

export const updateUserAvatar = async (user_public_id: string, avatar: File | null) => {
    if (!user_public_id) throw new Error('User ID is required and should not be empty');
    if (avatar && avatar.size > PROFILE_PICTURE_LIMIT) throw new Error('File size too large'); // 5MB

    const supabase = await serverClient();
    if (!avatar) {
        const { data: user, error } = await supabase
            .from('user')
            .update({ avatar: null })
            .eq('public_id', user_public_id)
            .select<'*'>('*')
            .single();
        if (error) throw new Error('Error updating user profile picture');
        return user as User;
    }

    const extension = avatar.type.split('/')[1];
    const fileName = `${user_public_id}.${extension}`;

    const { data, error } = await supabase.storage.from('avatars').upload(fileName, avatar, {
        cacheControl: '3600',
        upsert: true,
    });

    console.error('Error uploading file:', error);
    if (error) throw new Error('Error uploading profile picture');

    const { data: user, error: userError } = await supabase
        .from('user')
        .update({ avatar: data?.path })
        .eq('public_id', user_public_id)
        .select<'*'>('*')
        .single();
    if (userError) throw new Error('Error updating user profile picture');

    return user as User;
};

export const updateUserData = async (user_id: string, user: UserWithDetails) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');
    if (!user) throw new Error('User data is required and should not be empty');

    const userData = {
        ...user,
        id: user_id,
    };

    const supabase = await serverClient();
    const { error } = await supabase.from('user').update(userData).eq('id', user_id);
    if (error) throw new Error('Error updating user data');

    return true;
};

export const updateUserPasswordEmail = async (token: string) => {
    if (!token) throw new Error('Captcha token is required and should not be empty');

    const supabase = await serverClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) throw new Error('User not found');

    const { error } = await supabase.auth.resetPasswordForEmail(user?.email, {
        captchaToken: token,
        redirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/auth/callback?reset=true',
    });

    if (error) throw new Error('Error sending password reset email');

    return true;
};

export const getUserMedia = async (user_id: string) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');

    const supabase = await serverClient();
    const { data: raw_media, error } = await supabase.from('media').select<'*'>('*').eq('user_id', user_id);
    if (error) throw new Error('Error fetching media');

    const transformedMedia: Media[] = raw_media.map(({ id, name, type, size }) => ({
        id,
        name,
        type: type as 'image' | 'video' | 'audio',
        size,
    }));

    return transformedMedia;
};

export const getUserCourses = async (user_id: string) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');

    const supabase = await serverClient();
    const { data: raw_courses, error } = await supabase.from('course_chapters').select<'*'>('*').eq('user_id', user_id);
    if (error) throw new Error('Error fetching courses');

    return raw_courses.map((course) => ({
        ...course,
        chapters: course.chapters ? (course.chapters as Chapter[]) : [],
    })) as Course[];
};

export const createUserMedia = async (
    user_id: string,
    media_id: string,
    name: string,
    type: 'image' | 'video' | 'audio',
    size: number,
) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');
    if (!media_id) throw new Error('Media ID is required and should not be empty');

    const supabase = await serverClient();

    const { error } = await supabase.from('media').insert([{ id: media_id, user_id, name, type, size }]);
    if (error) throw new Error('Error creating media');

    return true;
};

export const updateUserMedia = async (user_id: string, media_id: string, name: string) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');
    if (!media_id) throw new Error('Media ID is required and should not be empty');
    if (!name) throw new Error('Name is required and should not be empty');

    const supabase = await serverClient();

    const { error } = await supabase.from('media').update({ name }).eq('id', media_id);
    if (error) throw new Error('Error updating media');

    return true;
};

export const deleteUserMedia = async (user_id: string, media_id: string) => {
    if (!user_id) throw new Error('User ID is required and should not be empty');
    if (!media_id) throw new Error('Media ID is required and should not be empty');

    const supabase = await serverClient();

    const { error } = await supabase.from('media').delete().eq('id', media_id);
    if (error) throw new Error('Error deleting media');

    return true;
};

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function uploadMedia(
    user_id: string,
    size: number,
    fileType: string,
    checksum: string,
): Promise<{ url: string; id: string }> {
    const id = v4();
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `${user_id}/${id}`,
        ContentType: INPUT_FILE_TYPES[fileType as 'image' | 'video' | 'audio'],
        ContentLength: size,
        ChecksumSHA256: checksum,
        CacheControl: 'max-age=31536000',
    });

    if (size > MAX_SIZES[fileType as 'image' | 'video' | 'audio']) {
        throw new Error('File size too large');
    }

    let signedURL = '';

    try {
        signedURL = await getS3SignedUrl(s3, putObjectCommand, {
            expiresIn: 60,
        });
    } catch (error) {
        console.error('Error getting signed URL:', error);
    } finally {
        return { url: signedURL, id };
    }
}

export async function downloadMedia(id: string): Promise<string> {
    if (!id) return '';

    const privateKey = fs.readFileSync(process.env.AWS_CLOUDFRONT_PRIVATE_KEY_PATH!, 'utf-8');

    const url = getCloudFrontSignedUrl({
        url: 'https://' + process.env.AWS_CLOUDFRONT_DOMAIN! + '/' + id,
        dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        privateKey,
        keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID!,
    });

    if (url) {
        return url;
    }

    return '';
}
