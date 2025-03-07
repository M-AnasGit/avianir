'use client';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
    createUserMedia,
    deleteUserMedia,
    downloadMedia,
    getUserCourses,
    getUserDetails,
    getUserMedia,
    updateUserMedia,
    uploadMedia,
} from '../server-actions';
import { uploadLimits } from '../constants';
import { uploadMediaType } from '../types';

type Props = {
    user_id: string;
};

const useUserData = ({ user_id }: Props) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: user, isLoading: isUserDataLoading } = useQuery({
        queryKey: ['user', user_id],
        queryFn: () => getUserDetails(user_id),
        retry: 3,
    });

    const { data: media, isLoading: isMediaLoading } = useQuery({
        queryKey: ['media', user_id],
        queryFn: () => getUserMedia(user_id),
        retry: 3,
    });

    const { data: courses, isLoading: isCoursesLoading } = useQuery({
        queryKey: ['courses', user_id],
        queryFn: () => getUserCourses(user_id),
        retry: 3,
    });

    const isLoading = React.useMemo(
        () => isUserDataLoading || isMediaLoading || isCoursesLoading,
        [isUserDataLoading, isMediaLoading, isCoursesLoading],
    );

    const canUpload = React.useMemo(() => {
        if (!user) return 0;
        const userUploadLimit = uploadLimits[user.subscription_plan];
        return media && media.reduce((acc, { size }) => acc + size, 0) < userUploadLimit * 1000000;
    }, [media, user]);

    const createMediaMutation = useMutation({
        mutationFn: ({ media_id, name, type, size }: { media_id: string; name: string; type: string; size: number }) =>
            createUserMedia(user_id, media_id, name, type as 'image' | 'video' | 'audio', size),
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
            queryClient.invalidateQueries({ queryKey: ['media', user_id] });
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
            uploadMedia(user_id, file.size, fileType, checksum),
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
        mutationFn: (mediaId: string) => downloadMedia(`${user_id}/${mediaId}`),
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
            updateUserMedia(user_id, media_id, name),
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
            queryClient.invalidateQueries({ queryKey: ['media', user_id] });
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
        mutationFn: ({ media_id }: { media_id: string }) => deleteUserMedia(user_id, media_id),
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
            queryClient.invalidateQueries({ queryKey: ['media', user_id] });
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
        user,
        media,
        courses,
        isLoading,
        canUpload: !!canUpload,
        createMediaMutation,
        getUploadMediaUrlMutation,
        downloadMediaMutation,
        updateMediaMutation,
        deleteMediaMutation,
    };
};
export default useUserData;
