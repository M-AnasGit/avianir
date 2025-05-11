'use client';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
    createUserMedia,
    deleteUserMedia,
    downloadMedia,
    getUserCourses,
    getUserMedia,
    updateUserAvatar,
    updateUserData,
    updateUserMedia,
    updateUserPasswordEmail,
    uploadMedia,
} from '../server-actions/user-data';
import { UPLOAD_LIMITS } from '../constants';
//@TYPES
import { uploadMediaType } from '../types';
import { User, UserWithDetails, UserWithEmail } from '@/services/types';

type Props = {
    user: User | undefined;
};

const useUserData = ({ user }: Props) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: media, isLoading: isMediaLoading } = useQuery({
        queryKey: ['media', user?.id as string],
        queryFn: () => getUserMedia(user?.id as string),
        retry: 3,
        enabled: !!user,
    });

    const { data: courses, isLoading: isCoursesLoading } = useQuery({
        queryKey: ['courses', user?.id as string],
        queryFn: () => getUserCourses(user?.id as string),
        retry: 3,
        enabled: !!user,
    });

    const isLoading = React.useMemo(() => isMediaLoading || isCoursesLoading, [isMediaLoading, isCoursesLoading]);

    const canUpload = React.useMemo(() => {
        if (!user) return false;
        const userUploadLimit = UPLOAD_LIMITS[user.subscription_plan];
        return media && media.reduce((acc, { size }) => acc + size, 0) < userUploadLimit * 1000000;
    }, [media, user, user && user.id]);

    const updateUserAvatarMutation = useMutation({
        mutationFn: ({ avatar }: { avatar: File | null }) => updateUserAvatar(user?.public_id as string, avatar),
        onMutate: () => {
            toast({
                title: 'Updating...',
                description: 'Your avatar is being updated. Please wait.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Update Successful',
                description: 'Your avatar has been updated successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['user', user?.id as string] });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Update Failed',
                description: 'There was an error updating your avatar. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const updateUserDataMutation = useMutation({
        mutationFn: ({ newUser }: { newUser: UserWithDetails }) => updateUserData(user?.id as string, newUser),
        onMutate: () => {
            toast({
                title: 'Updating...',
                description: 'Your data is being updated. Please wait.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Update Successful',
                description: 'Your data has been updated successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['user', user?.id as string] });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Update Failed',
                description: 'There was an error updating your data. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const updateUserPasswordWithEmailMutation = useMutation({
        mutationFn: ({ token }: { token: string }) => updateUserPasswordEmail(token),
        onMutate: () => {
            console.log('Mutating...');
            toast({
                title: 'Processing...',
                description: 'Your request is being processed. Please wait.',
            });
        },
        onSuccess: () => {
            console.log('Mutated Successfully');
            toast({
                title: 'Email sent Successfully',
                description: 'Please check your email for the password reset link.',
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Request Failed',
                description: 'There was an error processing your request. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const createMediaMutation = useMutation({
        mutationFn: ({ media_id, name, type, size }: { media_id: string; name: string; type: string; size: number }) =>
            createUserMedia(user?.id as string, media_id, name, type as 'image' | 'video' | 'audio', size),
        onMutate: () => {
            toast({
                title: 'Upload...',
                description: 'Your media is being uploaded. Please wait.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Upload Successful',
                description: 'Your media has been uploaded successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['media', user?.id as string] });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Upload Failed',
                description: 'There was an error uploading your media. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const getUploadMediaUrlMutation = useMutation({
        mutationFn: ({ file, fileType, checksum }: uploadMediaType) =>
            uploadMedia(user?.id as string, file.size, fileType, checksum),
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Upload Failed',
                description: 'There was an error uploading your file. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const downloadMediaMutation = useMutation({
        mutationFn: (mediaId: string) => downloadMedia(`${user?.id as string}/${mediaId}`),
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Download Failed',
                description: 'There was an error downloading your file. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const updateMediaMutation = useMutation({
        mutationFn: ({ media_id, name }: { media_id: string; name: string }) =>
            updateUserMedia(user?.id as string, media_id, name),
        onMutate: () => {
            toast({
                title: 'Updating...',
                description: 'Your file is being updated. Please wait.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Update Successful',
                description: 'Your file has been updated successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['media', user?.id as string] });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Update Failed',
                description: 'There was an error updating your file. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const deleteMediaMutation = useMutation({
        mutationFn: ({ media_id }: { media_id: string }) => deleteUserMedia(user?.id as string, media_id),
        onMutate: () => {
            toast({
                title: 'Deleting...',
                description: 'Your file is being deleted. Please wait.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Delete Successful',
                description: 'Your file has been deleted successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['media', user?.id as string] });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Delete Failed',
                description: 'There was an error deleting your file. Please try again.',
                variant: 'destructive',
            });
        },
    });

    return {
        media,
        courses,
        isLoading,
        canUpload: !!canUpload,
        updateUserAvatarMutation,
        updateUserDataMutation,
        updateUserPasswordWithEmailMutation,
        createMediaMutation,
        getUploadMediaUrlMutation,
        downloadMediaMutation,
        updateMediaMutation,
        deleteMediaMutation,
    };
};
export default useUserData;
