import { Loader2 } from 'lucide-react';

type Props = {
    style?: React.CSSProperties;
};

export default function MediaLoading({ style }: Props) {
    return (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground" style={style}>
            <Loader2 size={32} className="animate-spin" />
        </div>
    );
}
