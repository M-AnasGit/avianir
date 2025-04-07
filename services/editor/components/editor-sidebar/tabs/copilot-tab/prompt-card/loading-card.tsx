import { Loader2 } from 'lucide-react';

export default function LoadingPromptCard() {
    return (
        <div className="history-card flex justify-center">
            <Loader2 size={32} className="animate-spin" />
        </div>
    );
}
