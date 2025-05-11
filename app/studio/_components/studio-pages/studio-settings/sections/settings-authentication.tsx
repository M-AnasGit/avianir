import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
//@SHADCNUI
import { Button } from '@/components/ui/button';
//@HOOKS
import { useUser } from '@/services/user/provider';
import { Loader2 } from 'lucide-react';

export default function SettingsAuthentication() {
    const { user, updateUserPassword } = useUser();

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const tokenRef = React.useRef<string | null>(null);
    const captchaRef = React.useRef<HCaptcha>(null);
    const onVerify = (token: string | null) => {
        tokenRef.current = token;
        setIsLoading(false);
        captchaRef.current?.resetCaptcha();
        if (token) {
            updateUserPassword(token);
        }
    };

    const handleRequestPasswordChange = () => {
        if (captchaRef.current) {
            captchaRef.current.execute();
            setIsLoading(true);
        }
    };

    if (!user) return null;

    return (
        <div className="edit-profile-container flex-col items-start md:flex-row md:items-center">
            <div className="flex w-full flex-col gap-2">
                <h2 className="font-medium">Authentication</h2>
                <p className="text-sm text-muted-foreground">
                    Manage your authentication settings depending on your authentication method.
                </p>
            </div>

            {user.auth_provider === 'email' ? (
                <>
                    <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                        onVerify={onVerify}
                        size="invisible"
                        ref={captchaRef}
                    />
                    <Button onClick={handleRequestPasswordChange} disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                            'Request password change'
                        )}
                    </Button>
                </>
            ) : (
                <Button disabled className="cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    You are using Google authentication.
                </Button>
            )}
        </div>
    );
}
