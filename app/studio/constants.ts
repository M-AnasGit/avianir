export const STUDIO_SCREENS = ['settings', 'help'];

export const STUDIO_LINKS: Record<
    string,
    {
        value: string;
        back: boolean;
        href?: string;
    }
> = {
    profile: { value: 'user', back: false },
};
