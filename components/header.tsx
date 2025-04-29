import Image from 'next/image';
import Link from 'next/link';
import { Input } from './ui/input';
import { ChevronDown, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

type Props = {
    isUser: boolean;
};

export default function Header({ isUser }: Props) {
    return (
        <nav className="flex items-center justify-between border-b border-b-border bg-muted px-16 py-6 shadow-sm">
            <div className="flex items-center justify-start space-x-4">
                <Image src="/full-logo.png" alt="Logo" width={180} height={180} />
                <div className="relative">
                    <Input id="search" placeholder="Search..." className="w-[350px] pr-8" />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-primary p-[7px] transition-colors duration-200 hover:bg-primary/75"
                    >
                        <Search className="size-[14px] text-primary-foreground" />
                    </button>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="inline-flex items-center gap-2 font-medium"
                            data-state="open"
                        >
                            Explore <ChevronDown size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/explore/recommendations" className="header-drop-down-item">
                                <h5>Recommended</h5>
                                <p>Get recommendations based on your preferences and usage.</p>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/explore/favorites" className="header-drop-down-item">
                                <h5>Favorites</h5>
                                <p>Access your favorite items and content.</p>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="header-drop-down-item" asChild>
                            <Link href="/explore/unfinished" className="header-drop-down-item">
                                <h5>Unfinished</h5>
                                <p>Continue where you left off.</p>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="header-drop-down-item" asChild>
                            <Link href="/explore/free" className="header-drop-down-item">
                                <h5>Free</h5>
                                <p>Explore free content and items.</p>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {isUser ? (
                <Link href="/studio" className="header-switch-to-studio">
                    Switch to Studio
                </Link>
            ) : (
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/login" className="header-login-button">
                            Login
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/login" className="header-login-button">
                            Sign Up
                        </Link>
                    </Button>
                </div>
            )}
        </nav>
    );
}
