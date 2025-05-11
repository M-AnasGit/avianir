import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StudioHelp() {
    return (
        <div className="flex flex-col gap-4">
            <div className="edit-profile-container items-start md:flex-row md:items-center">
                <div className="flex w-full flex-col gap-2">
                    <h2 className="font-medium">Terms and conditions</h2>
                    <p className="text-sm text-muted-foreground">
                        View the terms and conditions of using the service. This is a document that outlines the rules
                        and guidelines for using the service.
                    </p>
                </div>
                <Button>
                    <Link href="/legal/terms" target="_blank">
                        View terms and conditions
                    </Link>
                </Button>
            </div>
            <div className="edit-profile-container items-start md:flex-row md:items-center">
                <div className="flex w-full flex-col gap-2">
                    <h2 className="font-medium">Privacy policy</h2>
                    <p className="text-sm text-muted-foreground">
                        View the privacy policy of using the service. This is a document that outlines how the service
                        collects, uses, and protects your personal information.
                    </p>
                </div>
                <Button>
                    <Link href="/legal/policy" target="_blank">
                        View privacy policy
                    </Link>
                </Button>
            </div>
        </div>
    );
}
