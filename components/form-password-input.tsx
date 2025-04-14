'use client';
import React from 'react';
import { cn } from '@/lib/utils';
//@SHACNUI
import { Input } from './ui/input';
//@LUCIDE
import { Eye, EyeClosed } from 'lucide-react';
//@TYPES
import { FieldError, UseFormRegister } from 'react-hook-form';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
    register: UseFormRegister<any>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

export default function PasswordInput({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    className,
    ...rest
}: Props) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handlePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={cn(className, `${error && 'input-error'}`)}
                    {...register(name!, { valueAsNumber })}
                    {...rest}
                />
                <span
                    role="button"
                    onClick={handlePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-200 hover:cursor-pointer hover:text-primary"
                >
                    {showPassword ? <EyeClosed className="size-5" /> : <Eye className="size-5" />}
                </span>
            </div>
            {error && <span className="form-error-message">{error.message}</span>}
        </>
    );
}
