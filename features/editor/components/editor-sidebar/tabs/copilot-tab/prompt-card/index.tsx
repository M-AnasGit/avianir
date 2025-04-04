'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { CopilotHistory } from '@/features/editor/types';

type Props = {
    copilotHistoryElement: CopilotHistory;
    selected: boolean;
    handleApplyCopilotResponse: (copilotHistoryElement: CopilotHistory['response']) => void;
    handlePreviewCopilotResponse: (copilotHistoryElement: CopilotHistory['response']) => void;
};

export default function CopilotPromptCard({
    copilotHistoryElement,
    selected,
    handleApplyCopilotResponse,
    handlePreviewCopilotResponse,
}: Props) {
    return (
        <div className="history-card">
            <div className="history-card-prompt-container relative mb-4 rounded-md border border-border p-2">
                <p className="text-xs italic text-muted-foreground">{copilotHistoryElement.prompt}</p>
            </div>
            <div className="flex w-full items-center gap-2">
                <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={() => handlePreviewCopilotResponse(copilotHistoryElement.response)}
                >
                    Preview
                </Button>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="w-full disabled:pointer-events-auto"
                            size="sm"
                            disabled={!selected}
                            onClick={() => handleApplyCopilotResponse(copilotHistoryElement.response)}
                        >
                            Apply
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-center">
                        This will apply the response to the selected element. <br></br>The selected element must be a
                        text element.
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
