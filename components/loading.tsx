import { Loader2 } from 'lucide-react';

type Props = {
    screen?: boolean;
};

export default function Loading({ screen = true }: Props) {
    return (
        <div
            className={`flex w-full items-center justify-center text-primary ${screen ? 'h-screen' : 'h-[300px]'}`}
            data-testid="loading"
        >
            <Loader2 size={64} className="animate-spin" />
        </div>
    );
}
