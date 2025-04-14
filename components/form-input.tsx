import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
    register: UseFormRegister<any>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

export default function FormInput({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    className,
    ...rest
}: Props) {
    return (
        <>
            <Input
                type={type}
                placeholder={placeholder}
                {...register(name!, { valueAsNumber })}
                className={cn(className, `${error && 'input-error'}`)}
                {...rest}
            />
            {error && <span className="form-error-message">{error.message}</span>}
        </>
    );
}
