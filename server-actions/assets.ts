'use server';
import fs from 'fs';
import { getSignedUrl as getCloudFrontSignedUrl } from '@aws-sdk/cloudfront-signer';

const THIRTY_DAYS_MS = 1000 * 60 * 60 * 24 * 30;

export async function downloadAsset(id: string): Promise<string> {
    if (!id) return '';

    const privateKey = fs.readFileSync(process.env.AWS_CLOUDFRONT_PRIVATE_KEY_PATH!, 'utf-8');

    const url = getCloudFrontSignedUrl({
        url: 'https://' + process.env.AWS_CLOUDFRONT_DOMAIN! + '/' + id,
        dateLessThan: new Date(Date.now() + THIRTY_DAYS_MS).toISOString(),
        privateKey,
        keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID!,
    });

    if (url) {
        return url;
    }

    return '';
}
