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
    updateUserMedia,
    uploadMedia,
} from '../server-actions/user-data';
import { uploadLimits } from '../constants';
//@TYPES
import { uploadMediaType } from '../types';
import { User } from '@/services/types';

type Props = {
    user: User;
};

const useUserData = ({ user }: Props) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: media, isLoading: isMediaLoading } = useQuery({
        queryKey: ['media', user.id],
        queryFn: () => getUserMedia(user.id),
        retry: 3,
    });

    const { data: courses, isLoading: isCoursesLoading } = useQuery({
        queryKey: ['courses', user.id],
        queryFn: () => getUserCourses(user.id),
        retry: 3,
    });

    const isLoading = React.useMemo(() => isMediaLoading || isCoursesLoading, [isMediaLoading, isCoursesLoading]);

    const canUpload = React.useMemo(() => {
        if (!user.id) return false;
        const userUploadLimit = uploadLimits[user.subscription_plan];
        return media && media.reduce((acc, { size }) => acc + size, 0) < userUploadLimit * 1000000;
    }, [media, user.id]);

    const createMediaMutation = useMutation({
        mutationFn: ({ media_id, name, type, size }: { media_id: string; name: string; type: string; size: number }) =>
            createUserMedia(user.id, media_id, name, type as 'image' | 'video' | 'audio', size),
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
            queryClient.invalidateQueries({ queryKey: ['media', user.id] });
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
            uploadMedia(user.id, file.size, fileType, checksum),
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
        mutationFn: (mediaId: string) => downloadMedia(`${user.id}/${mediaId}`),
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
            updateUserMedia(user.id, media_id, name),
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
            queryClient.invalidateQueries({ queryKey: ['media', user.id] });
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
        mutationFn: ({ media_id }: { media_id: string }) => deleteUserMedia(user.id, media_id),
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
            queryClient.invalidateQueries({ queryKey: ['media', user.id] });
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
        createMediaMutation,
        getUploadMediaUrlMutation,
        downloadMediaMutation,
        updateMediaMutation,
        deleteMediaMutation,
    };
};
export default useUserData;
