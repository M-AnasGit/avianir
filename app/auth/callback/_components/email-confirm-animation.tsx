'use client';
import Lottie from 'lottie-react';
import animationData from '@/public/email_confirm.json';

export default function ConfirmEmailAnimation() {
    return <Lottie animationData={animationData} className="flex items-center justify-center" />;
}
