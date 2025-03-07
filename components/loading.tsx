import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center text-primary" data-testid="loading">
            <Loader2 size={64} className="animate-spin" />
        </div>
    );
}
