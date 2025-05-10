import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
//@SHADNCUI
import { Button } from '@/components/ui/button';
//@COMPONENTS
import UserAvatar from '@/components/user-avatar';
import AvatarModal from './sections/avatar-modal';
import ProfilePersonalDetails from './sections/profile-personal-details';
import ProfileDescription from './sections/profile-description';
import ProfileSocials from './sections/profile-socials';
import ProfileSelect from './sections/profile-select';
//@CONSTANTS
import { FIELDS_OF_INTEREST, LANGUAGES } from './constants';
//@HELPERS
import { getCroppedImg, getDefaultValues, UserDetailsSchema, userDetailsSchema } from './helpers';
//@ICONS
import { SwitchCamera } from 'lucide-react';
//@HOOKS
import { useUser } from '@/services/user/provider';
import { useModal } from '@/components/providers/modal-provider';
//@TYPES
import { Area } from 'react-easy-crop';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { UserWithDetails } from '@/services/types';

export default function StudioProfile() {
    const { user, updateUserAvatar, updateUserData } = useUser();
    const { handleSetModal } = useModal();

    const [avatarUrl, setAvatarUrl] = React.useState<string | undefined>(undefined);
    const avatarRef = React.useRef<HTMLInputElement>(null);
    const handleAvatarClick = () => {
        avatarRef.current?.click();
    };
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (!file) return;

        const avatar = file as File;
        if (!avatar) return;
        avatarRef.current!.value = '';
        handleSetModal(<AvatarModal avatarUrl={URL.createObjectURL(avatar)} handleSaveAvatar={handleSaveAvatar} />);
    };
    const handleSaveAvatar = async (url: string, crop: Area) => {
        const croppedBlob = await getCroppedImg(url, crop);
        if (croppedBlob) {
            const file = new File([croppedBlob], 'avatar.jpg', { type: croppedBlob.type || 'image/jpeg' });

            setAvatarUrl(URL.createObjectURL(file));
            if (user) {
                await updateUserAvatar(file);
            }
        }
    };
    const removeAvatar = () => {
        setAvatarUrl(undefined);
        if (user) {
            updateUserAvatar(null);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(userDetailsSchema),
        defaultValues: getDefaultValues(user),
    });
    const formValues = watch();

    const [hasChanges, setHasChanges] = React.useState<boolean>(false);
    React.useEffect(() => {
        const initialValues = getDefaultValues(user);

        const isChanged =
            formValues.name !== initialValues.name ||
            formValues.occupation !== initialValues.occupation ||
            formValues.city !== initialValues.city ||
            formValues.description !== initialValues.description ||
            formValues.socials.linkedin !== initialValues.socials.linkedin ||
            formValues.socials.twitter !== initialValues.socials.twitter ||
            formValues.socials.instagram !== initialValues.socials.instagram ||
            formValues.socials.facebook !== initialValues.socials.facebook ||
            formValues.socials.github !== initialValues.socials.github ||
            formValues.socials.website !== initialValues.socials.website ||
            formValues.languages?.length !== (user?.details.languages ?? []).length ||
            formValues.languages?.some((lang) => !user?.details.languages?.includes(lang)) ||
            formValues.fields?.length !== (user?.details.fields ?? []).length ||
            formValues.fields?.some((field) => !user?.details.fields?.includes(field));

        setHasChanges(isChanged);
    }, [formValues, user]);

    const formRef = React.useRef<HTMLFormElement>(null);
    const [formWidth, setFormWidth] = React.useState<number | undefined>(undefined);
    React.useEffect(() => {
        const updateFormWidth = () => {
            if (formRef.current) {
                setFormWidth(formRef.current.clientWidth);
            }
        };

        updateFormWidth();

        window.addEventListener('resize', updateFormWidth);
        return () => {
            window.removeEventListener('resize', updateFormWidth);
        };
    }, []);
    const onSubmit = async (data: UserDetailsSchema) => {
        const newUser = {
            ...user,
            name: data.name,
            details: {
                ...user?.details,
                socials: {
                    ...user?.details.socials,
                    linkedin: data.socials.linkedin,
                    twitter: data.socials.twitter,
                    instagram: data.socials.instagram,
                    facebook: data.socials.facebook,
                    github: data.socials.github,
                    website: data.socials.website,
                },
                city: data.city,
                occupation: data.occupation,
                description: data.description,
                fields: data.fields,
                languages: data.languages,
            },
        };
        delete newUser.email;
        updateUserData(newUser as UserWithDetails);
    };

    if (!user) return null;

    return (
        <div className="flex flex-col items-center gap-8 px-4 xl:flex-row xl:items-start">
            <input
                ref={avatarRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
            />
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="group relative cursor-pointer" onClick={handleAvatarClick}>
                    <span className="absolute z-10 h-full w-full rounded-full bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-50" />
                    <SwitchCamera className="absolute z-20 h-6 w-6 translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-muted p-1 text-muted-foreground transition-all duration-200 group-hover:scale-100" />
                    <UserAvatar user={user} avatarUrl={avatarUrl} width={160} height={160} textSize={2} round={true} />
                </div>
                {user.avatar && (
                    <Button variant="outline" onClick={removeAvatar}>
                        Remove avatar
                    </Button>
                )}
            </div>
            <FormProvider
                {...({
                    register,
                    setValue,
                    formState: { errors },
                } as UseFormReturn<UserDetailsSchema>)}
            >
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${hasChanges && 'mb-20'} flex w-full flex-col items-end gap-4`}
                >
                    <div className="flex w-full flex-col gap-4">
                        <ProfilePersonalDetails email={user.email} />
                        <ProfileDescription description={user.details.description} />
                        <ProfileSocials socials={user.details.socials} />
                        <div className="flex w-full flex-col gap-4 md:flex-row">
                            <ProfileSelect
                                id="languages"
                                title="Languages"
                                subtitle="Add the languages you are fluent in. This will help others to connect with you better."
                                data={LANGUAGES}
                                values={user.details.languages || []}
                            />
                            <ProfileSelect
                                id="fields"
                                title="Fields of interest"
                                subtitle="Add the fields you are interested in. This will help others to connect with you better."
                                data={FIELDS_OF_INTEREST}
                                values={user.details.fields || []}
                            />
                        </div>
                    </div>
                    <AnimatePresence>
                        {hasChanges && (
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="edit-profile-container fixed bottom-[16px] right-6 z-10 -translate-x-1/2 transform flex-row items-center justify-center"
                                style={{
                                    width: formWidth,
                                }}
                                role="alert"
                            >
                                <h3 className="hidden text-sm text-muted-foreground md:block">
                                    You have made some changes. Please save them to apply.
                                </h3>
                                <Button type="submit" className="w-fit" variant="default" disabled={!hasChanges}>
                                    Save changes
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </FormProvider>
        </div>
    );
}
