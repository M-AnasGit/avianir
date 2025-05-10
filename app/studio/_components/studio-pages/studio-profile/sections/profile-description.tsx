import React from 'react';
import { useFormContext } from 'react-hook-form';
//@COMPONENTS
import RichTextInput from '@/components/rich-content/rich-text';
//@CONSTANTS
import { DEFAULT_PALETTE } from '@/services/constants';
//@HELPERS
import { countWordsFromHtml } from '../helpers';
//@HOOKS
import { useTheme } from 'next-themes';

type Props = {
    description: string | undefined | null;
};

const filterEmptyContent = (content: string) => (content === '<p></p>' ? '' : content);

export default function ProfileDescription({ description }: Props) {
    const [content, setContent] = React.useState<string | undefined | null>(description);
    const wordCount = React.useMemo(() => countWordsFromHtml(content || ''), [content]);
    const { theme } = useTheme();
    const { register, setValue } = useFormContext();

    React.useEffect(() => {
        setValue('description', content ? filterEmptyContent(content) : '');
    }, [content, setValue]);

    React.useEffect(() => {
        if (theme) {
            const root = document.documentElement;

            Object.entries(DEFAULT_PALETTE.default).forEach(([key, value]) => {
                root.style.setProperty(`--default-${key.replace(/\s+/g, '-')}`, value[theme as 'light' | 'dark']);
            });

            Object.entries(DEFAULT_PALETTE.custom).forEach(([key, value]) => {
                root.style.setProperty(`--custom-${key.replace(/\s+/g, '-')}`, value[theme as 'light' | 'dark']);
            });
        }
    }, [theme]);

    return (
        <div className="edit-profile-container">
            <div className="flex w-full flex-col gap-2">
                <h2 className="font-medium">Description</h2>
                <p className="text-sm text-muted-foreground">
                    Add a short description about yourself. This will be visible to other users.
                </p>
                <input type="text" className="hidden" {...register('description')} value={content || ''} />
                <RichTextInput
                    content={description || ''}
                    style={{}}
                    palette={DEFAULT_PALETTE}
                    setContent={setContent}
                />
                <small
                    className="self-end text-xs font-medium text-muted-foreground data-[state=overflow]:text-destructive"
                    data-state={wordCount > 250 ? 'overflow' : 'normal'}
                >
                    {wordCount}/250
                </small>
            </div>
        </div>
    );
}
