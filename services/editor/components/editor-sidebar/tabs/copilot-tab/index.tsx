'use client';
import React from 'react';
//@CUSTOM COMPONENTS
import CopilotPromptCard from './prompt-card';
import LoadingPromptCard from './prompt-card/loading-card';
import ErrorPromptCard from './prompt-card/error-card';
import PreviewCopilotResponseModal from './preview-modal';
//@SHADCNUI
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
//@LUCIDEREACT
import { Bot, Info } from 'lucide-react';
//@CUSTON HOOKS
import { useCopilot } from '@/services/editor/hooks/useCopilot';
import { useEditor } from '@/services/editor/provider';
import { useUser } from '@/services/user/provider';
import { useModal } from '@/components/providers/modal-provider';
//@TYPES
import { CopilotHistory, ElementTypes } from '@/services/editor/types';

const MAX_CHARACTER_COUNT = 200;
const MAX_TOKENS = 1000000;
const ACCEPTED_TYPES = new Set<ElementTypes>(['text', 'table']);

export default function CopilotTab() {
    const { state, dispatch } = useEditor();
    const { user } = useUser();
    const { handleSetModal } = useModal();
    const { copilotHistory, promptCopilotMutation, promptLoading, promptError } = useCopilot({
        course_id: state.course_id,
        user_id: user.id,
    });

    const [characterCount, setCharacterCount] = React.useState<number>(0);
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharacterCount(e.target.value.length);
    };
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const prompt = formData.get('prompt') as string;

        promptCopilotMutation.mutateAsync({
            prompt,
        });
    };

    const historyRef = React.useRef<HTMLDivElement>(null);
    const formatDate = React.useCallback((dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }, []);
    React.useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [copilotHistory]);

    const handlePreviewCopilotResponse = React.useCallback(
        (copilotResponse: CopilotHistory['response']) => {
            handleSetModal(<PreviewCopilotResponseModal copilotResponse={copilotResponse} />, 1200);
        },
        [handleSetModal],
    );

    const handleApplyCopilotResponse = React.useCallback(
        (copilotResponse: CopilotHistory['response']) => {
            const selectedElement = state.editor.selectedElement;
            if (selectedElement && ACCEPTED_TYPES.has(selectedElement.type)) {
                dispatch({
                    type: 'UPDATE_ELEMENT',
                    payload: {
                        elementDetails: {
                            ...selectedElement,
                            content: {
                                ...copilotResponse.content,
                            },
                            stylePerDevice: {
                                ...selectedElement.stylePerDevice,
                                ...copilotResponse.stylePerDevice,
                            },
                        },
                    },
                });
            }
        },
        [dispatch, state.editor.selectedElement],
    );

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <p className="prop-small" role="alert">
                Copilot can make mistakes. Please review the content before using it.
            </p>
            <section className="flex max-h-[60vh] w-full flex-1 flex-col items-center justify-center py-8">
                {(copilotHistory && copilotHistory.length > 0) || (copilotHistory && promptLoading) ? (
                    <div ref={historyRef} className="no-scrollbar w-full flex-1 space-y-6 overflow-y-auto pb-8">
                        {copilotHistory.reduce((acc: React.JSX.Element[], item, index) => {
                            const itemDate = formatDate(item.created_at);
                            const prevItemDate = index > 0 ? formatDate(copilotHistory[index - 1].created_at) : null;

                            if (itemDate !== prevItemDate) {
                                acc.push(
                                    <div
                                        key={`separator-${itemDate}`}
                                        className="text-center text-xs font-semibold text-muted-foreground opacity-75"
                                    >
                                        {new Date(item.created_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>,
                                );
                            }

                            acc.push(
                                <CopilotPromptCard
                                    key={index}
                                    copilotHistoryElement={item}
                                    selected={
                                        !!(
                                            state.editor.selectedElement &&
                                            ACCEPTED_TYPES.has(state.editor.selectedElement.type)
                                        )
                                    }
                                    handleApplyCopilotResponse={handleApplyCopilotResponse}
                                    handlePreviewCopilotResponse={handlePreviewCopilotResponse}
                                />,
                            );
                            return acc;
                        }, [])}
                        {promptLoading && <LoadingPromptCard />}
                        {promptError && <ErrorPromptCard />}
                    </div>
                ) : (
                    <>
                        <Bot className="size-24 text-muted-foreground opacity-25" />
                        <h2 className="mt-2 text-sm font-medium text-muted-foreground opacity-40">
                            How can I help you today?
                        </h2>
                        <p className="mt-2 text-center text-xs text-muted-foreground opacity-70">
                            I can help you to generate content from scratch for your course.
                        </p>
                    </>
                )}
            </section>
            <form onSubmit={handleFormSubmit} className="w-full">
                <div className="relative">
                    <Textarea
                        name="prompt"
                        id="copilot-prompt"
                        placeholder="Create a new section about..."
                        aria-label="prompt"
                        rows={4}
                        className="w-full resize-none placeholder:italic placeholder:text-muted-foreground placeholder:opacity-50"
                        onChange={handleTextareaChange}
                        maxLength={MAX_CHARACTER_COUNT}
                    />
                    <div className="absolute bottom-2 right-2 rounded px-1 text-xs text-muted-foreground">
                        {characterCount}/{MAX_CHARACTER_COUNT}
                    </div>
                </div>
                <Button
                    className="mt-4 w-full"
                    variant="outline"
                    size="sm"
                    type="submit"
                    disabled={promptLoading || characterCount === 0 || user.tokens_used / MAX_TOKENS === 0}
                >
                    Ask Copilot
                </Button>
            </form>
            <div className="flex w-full items-center gap-x-2 pt-2">
                <Progress value={user.tokens_used / MAX_TOKENS} max={MAX_TOKENS} />
                <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                        <Info size={14} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {user.tokens_used} / {MAX_TOKENS} tokens used
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
