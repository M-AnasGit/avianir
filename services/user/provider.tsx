'use client';
import React from 'react';
import Loading from '@/components/loading';
import useUserData from './hooks/useUserData';

import { Course, uploadMediaType, User } from './types';
import { Media } from '../types';
type UserProviderContextType = {
    user: User;
    media: Media[];
    courses: Course[];
    canUpload: boolean;
    createMedia: (media_id: string, name: string, type: 'image' | 'video' | 'audio', size: number) => Promise<void>;
    getUploadMediaUrl: (data: uploadMediaType) => Promise<{
        url: string;
        id: string;
    }>;
    downloadMedia: (media_id: string) => Promise<string>;
    updateMediaData: (media_id: string, name: string) => Promise<void>;
    deleteMedia: (media_id: string) => Promise<void>;
};
type UserProviderProps = React.PropsWithChildren<{
    user_id: string;
}>;

const UserProviderContext = React.createContext<UserProviderContextType | undefined>(undefined);

const UserProvider = ({ user_id, children }: UserProviderProps) => {
    const {
        user,
        media,
        courses,
        isLoading,
        canUpload,
        createMediaMutation,
        getUploadMediaUrlMutation,
        downloadMediaMutation,
        updateMediaMutation,
        deleteMediaMutation,
    } = useUserData({
        user_id,
    });

    const getUploadMediaUrl = React.useCallback(
        async (data: uploadMediaType) => {
            const response = await getUploadMediaUrlMutation.mutateAsync(data);
            return response;
        },
        [getUploadMediaUrlMutation],
    );

    const createMedia = React.useCallback(
        async (media_id: string, name: string, type: 'image' | 'video' | 'audio', size: number) => {
            await createMediaMutation.mutateAsync({ media_id, name, type, size });
        },
        [createMediaMutation],
    );

    const downloadMedia = React.useCallback(
        async (media_id: string) => {
            return await downloadMediaMutation.mutateAsync(media_id);
        },
        [downloadMediaMutation],
    );

    const updateMediaData = React.useCallback(
        async (media_id: string, name: string) => {
            await updateMediaMutation.mutateAsync({ media_id, name });
        },
        [updateMediaMutation],
    );

    const deleteMedia = React.useCallback(
        async (media_id: string) => {
            await deleteMediaMutation.mutateAsync({ media_id });
        },
        [deleteMediaMutation],
    );

    if (isLoading) return <Loading />;
    if (user === undefined || media === undefined || courses === undefined)
        throw new Error('Error while fetching user data');

    return (
        <UserProviderContext.Provider
            value={{
                user,
                media,
                courses,
                canUpload,
                createMedia,
                getUploadMediaUrl,
                downloadMedia,
                updateMediaData,
                deleteMedia,
            }}
        >
            {children}
        </UserProviderContext.Provider>
    );
};

export default UserProvider;

export const useUser = () => {
    const context = React.useContext(UserProviderContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
