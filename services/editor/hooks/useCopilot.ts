'use client';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCopilotHistory, promptCopilot } from '../server-actions/copilot';

type Props = {
    course_id: string;
    user_id: string;
};

export const useCopilot = ({ course_id, user_id }: Props) => {
    const {
        data: copilotHistory,
        isError: isCopilotHistoryError,
        isLoading: isCopilotHistoryLoading,
    } = useQuery({
        queryKey: ['copilotHistory', course_id],
        queryFn: () => getCopilotHistory(course_id),
        retry: 3,
    });

    const queryClient = useQueryClient();

    const [promptLoading, setPromptLoading] = React.useState<boolean>(false);
    const [promptError, setPromptError] = React.useState<Error | null>(null);
    const promptCopilotMutation = useMutation({
        mutationFn: ({ prompt }: { prompt: string }) => promptCopilot(prompt, course_id, user_id),
        onMutate: () => {
            setPromptLoading(true);
        },
        onSuccess: () => {
            setPromptLoading(false);
            queryClient.invalidateQueries({
                queryKey: ['copilotHistory', course_id],
            });
        },
        onError: (err: Error) => {
            console.error(err);
            setPromptError(err);
        },
    });

    return {
        copilotHistory,
        isCopilotHistoryError,
        isCopilotHistoryLoading,
        promptCopilotMutation,
        promptLoading,
        promptError,
    };
};
