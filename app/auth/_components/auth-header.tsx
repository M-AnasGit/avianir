import { GalleryHorizontalIcon } from 'lucide-react';

type Props = {
    title: string;
    description: string | React.ReactNode;
};

export default function AuthHeader({ title, description }: Props) {
    return (
        <div className="flex flex-col items-center gap-1 md:gap-2">
            <span className="flex flex-col items-center gap-2 font-medium">
                <div className="flex items-center justify-center">
                    <GalleryHorizontalIcon className="h-8 w-8 text-primary" />
                </div>
                <span className="sr-only">{process.env.NEXT_PUBLIC_PLACEHOLDER_NAME}</span>
            </span>
            <h1 className="text-center text-lg font-bold lg:text-xl">{title}</h1>
            <div className="text-center text-sm">{description}</div>
        </div>
    );
}
