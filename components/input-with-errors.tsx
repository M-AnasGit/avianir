import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithErrorsProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: {
        message: string;
    };
}

export default function InputWithErrors({ id, label, type = 'text', placeholder, error }: InputWithErrorsProps) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
                <Label htmlFor={id} className={`prop-label capitalize ${error?.message ? '!text-destructive' : ''}`}>
                    {label}
                </Label>
                <span className="block text-xs leading-none text-destructive" role="alert">
                    {error?.message}
                </span>
            </div>
            <Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                aria-invalid={error?.message ? 'true' : 'false'}
                className={`${error?.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
        </div>
    );
}
