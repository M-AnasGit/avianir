import React from 'react';
import { useFormContext } from 'react-hook-form';
//@COMPONENTS
import { Input } from '@/components/ui/input';
//@ICONS
import { SocialIcon } from 'react-social-icons';
import { Globe } from 'lucide-react';
//@CONSTANTS
import { PLATFORMS } from '../constants';
//@TYPES
import { UserWithEmail } from '@/services/types';
import { UserDetailsSchema } from '../helpers';
type Props = {
    socials: UserWithEmail['details']['socials'];
};

export default function ProfileSocials({ socials }: Props) {
    const {
        setValue,
        formState: { errors },
    } = useFormContext<UserDetailsSchema>();
    const [socialState, setSocialState] = React.useState(() => {
        const initialState: UserWithEmail['details']['socials'] = {
            linkedin: '',
            twitter: '',
            instagram: '',
            facebook: '',
            github: '',
            website: '',
        };
        return { ...initialState, ...socials };
    });

    const handleSetSocialState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSocialState((prev) => ({
            ...prev,
            [name]: value,
        }));
        setValue('socials', {
            ...socialState,
            [name]: value,
        });
    };

    const getSocialError = (platform: string) => {
        return errors.socials?.[platform]?.message as string | undefined;
    };

    return (
        <div className="edit-profile-container">
            <div className="flex w-full flex-col gap-2">
                <h2 className="font-medium">Socials</h2>
                <p className="text-sm text-muted-foreground">
                    Add your social media profiles for others to connect with you.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {PLATFORMS.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex w-full items-center gap-2">
                                <SocialIcon
                                    network={p.id}
                                    style={{
                                        height: '2rem',
                                        width: '2rem',
                                    }}
                                    borderRadius={'8px'}
                                />

                                <Input
                                    id={p.id}
                                    name={p.id}
                                    type="text"
                                    placeholder={`Your ${p.name} profile link`}
                                    className={`form-input ${getSocialError(p.id) && 'input-error'} w-full`}
                                    value={socialState[p.id as keyof UserWithEmail['details']['socials']] || ''}
                                    onChange={handleSetSocialState}
                                />
                            </div>
                            {getSocialError(p.id) && <span className="form-error-message">{getSocialError(p.id)}</span>}
                        </div>
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <div className="flex w-full items-center gap-2">
                        <div className="rounded-lg p-[6.3px] text-foreground">
                            <Globe className="h-4 w-4" />
                        </div>
                        <Input
                            id="website"
                            name="website"
                            type="text"
                            placeholder={`Your website link`}
                            className={`form-input ${getSocialError('website') && 'input-error'} w-full`}
                            value={socialState['website'] || ''}
                            onChange={handleSetSocialState}
                        />
                        {getSocialError('website') && (
                            <span className="form-error-message">{getSocialError('website')}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
