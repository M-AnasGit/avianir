import ResetPwForm from '../../_components/reset-pw-form';
import AuthHeader from '../../_components/auth-header';

export default function ResetPassword() {
    return (
        <div className="mx-auto w-3/4 space-y-4 lg:w-1/3">
            <div className="flex flex-col gap-2 md:gap-4">
                <AuthHeader
                    title={`Reset your ${process.env.NEXT_PUBLIC_PLACEHOLDER_NAME} password`}
                    description={'Please enter your new password to reset your account password.'}
                />
                <ResetPwForm />
            </div>
        </div>
    );
}
