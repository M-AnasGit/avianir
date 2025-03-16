'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
//@SERVER ACTIONS
import { getCourseData, updateCourseData } from '../server-actions/editor-data';
//@CUSTOM HOOKS
import { useToast } from '@/hooks/use-toast';
//@Types
import { ChapterData, Preset } from '../types';
type Props = {
    course_id: string;
    chapter_id: string;
};

export const useEditorData = ({ course_id, chapter_id }: Props) => {
    const { toast } = useToast();

    const {
        data: courseData,
        isError: isCourseDataError,
        isLoading: isCourseDataLoading,
    } = useQuery({
        queryKey: ['courseData', course_id, chapter_id],
        queryFn: () => getCourseData(course_id, chapter_id),
        retry: 3,
    });

    const updateCourseDataMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Palette | Preset[] | ChapterData }) =>
            updateCourseData(course_id, id, data),
        onMutate: () => {
            toast({
                title: 'Updating...',
                description: 'Your changes are being saved.',
            });
        },
        onSuccess: () => {
            toast({
                title: 'Update Successful',
                description: 'Your changes have been saved.',
            });
        },
        onError: (err: Error) => {
            console.error(err);
            toast({
                title: 'Update Failed',
                description: 'There was an error saving your changes. Please try again.',
                variant: 'destructive',
            });
        },
    });

    return {
        presets: courseData?.presets || undefined,
        palette: courseData?.palette || undefined,
        chapter: courseData?.chapter || undefined,
        updateCourseDataMutation,
        isLoading: isCourseDataLoading,
        isError: isCourseDataError,
    };
};
