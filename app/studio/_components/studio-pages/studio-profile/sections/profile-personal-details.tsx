import React from 'react';
import { useFormContext } from 'react-hook-form';
//@COMPONENTS
import FormInput from '@/components/form-input';
//@SHADCNUI
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
//@TYPES
import { UserDetailsSchema } from '../helpers';
type Props = {
    email: string;
};

export default function ProfilePersonalDetails({ email }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext<UserDetailsSchema>();
    return (
        <div className="edit-profile-container">
            <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                <span className="lg:col-span-2">
                    <h2 className="font-medium">Personal details</h2>
                    <p className="text-sm text-muted-foreground">
                        Fill your personal details. This will be visible to other users except your email.
                    </p>
                </span>
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <FormInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                        className="form-input"
                        register={register}
                        autoComplete="name"
                        error={errors.name}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        defaultValue={email}
                        className="form-input"
                        autoComplete="email"
                        disabled
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="occupation">Occupation</Label>
                    <FormInput
                        id="occupation"
                        name="occupation"
                        placeholder="Occupation"
                        className="form-input"
                        register={register}
                        autoComplete="occupation"
                        error={errors.occupation}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <FormInput
                        id="city"
                        name="city"
                        placeholder="City"
                        className="form-input"
                        register={register}
                        autoComplete="city"
                        error={errors.city}
                    />
                </div>
            </div>
        </div>
    );
}
