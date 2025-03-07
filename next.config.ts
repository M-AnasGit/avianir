import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.AWS_CLOUDFRONT_DOMAIN!,
            },
        ],
    },
};

export default nextConfig;
