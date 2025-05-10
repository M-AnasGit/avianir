import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { UserWithEmail } from '@/services/types';

type Props = {
    user: UserWithEmail;
    avatarUrl?: string;
    width?: number;
    height?: number;
    textSize?: number;
    round?: boolean;
};

export default function UserAvatar({ user, avatarUrl, width, height, textSize, round }: Props) {
    return (
        <Avatar
            className={cn(round ? 'rounded-full' : 'rounded-lg', 'border border-border shadow-sm')}
            style={{
                width: width || '32px',
                height: height || '32px',
            }}
        >
            <AvatarImage
                src={
                    avatarUrl
                        ? avatarUrl
                        : `${process.env.NEXT_PUBLIC_STORAGE_URL!}/avatars/${user?.avatar}` || undefined
                }
                alt={user.name}
            />
            <AvatarFallback
                className="rounded-lg bg-primary font-medium text-primary-foreground"
                style={{
                    fontSize: `${textSize}rem` || '1rem',
                }}
            >
                {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
