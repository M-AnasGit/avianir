import { z } from 'zod';
import { Area } from 'react-easy-crop';
//@CONSTANTS
import { FIELDS_OF_INTEREST, LANGUAGES } from './constants';
//@TYPES
import { UserWithEmail } from '@/services/types';

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });

export const getCroppedImg = async (
    imageSrc: string,
    croppedPixels: Area,
    rotation: number = 0,
): Promise<Blob | null> => {
    try {
        const image: HTMLImageElement = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        const radians = (rotation * Math.PI) / 180;

        const rotatedWidth = Math.abs(Math.cos(radians) * image.width) + Math.abs(Math.sin(radians) * image.height);
        const rotatedHeight = Math.abs(Math.sin(radians) * image.width) + Math.abs(Math.cos(radians) * image.height);

        canvas.width = rotatedWidth;
        canvas.height = rotatedHeight;

        ctx?.translate(rotatedWidth / 2, rotatedHeight / 2);
        ctx?.rotate(radians);

        ctx?.drawImage(image, -image.width / 2, -image.height / 2);
        ctx?.setTransform(1, 0, 0, 1, 0, 0);

        const croppedCanvas = document.createElement('canvas');
        const croppedCtx: CanvasRenderingContext2D | null = croppedCanvas.getContext('2d');

        croppedCanvas.width = croppedPixels.width;
        croppedCanvas.height = croppedPixels.height;

        croppedCtx?.drawImage(
            canvas,
            croppedPixels.x,
            croppedPixels.y,
            croppedPixels.width,
            croppedPixels.height,
            0,
            0,
            croppedPixels.width,
            croppedPixels.height,
        );

        return new Promise((resolve, reject) => {
            croppedCanvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Blob creation failed');
                    reject(null);
                    return;
                }
                resolve(blob);
            }, 'image/jpeg');
        });
    } catch (error) {
        console.error('Error cropping image:', error);
        return null;
    }
};

export function countWordsFromHtml(html: string): number {
    const text = html.replace(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/);

    return words.filter(Boolean).length;
}

export function getDefaultValues(user: UserWithEmail | undefined): UserDetailsSchema {
    return {
        name: user?.name || '',
        occupation: user?.details.occupation || '',
        city: user?.details.city || '',
        description: user?.details.description || '',
        socials: user?.details.socials || {
            linkedin: '',
            twitter: '',
            instagram: '',
            facebook: '',
            github: '',
            website: '',
        },
        languages: user?.details.languages || [],
        fields: user?.details.fields || [],
    };
}

// Zod schema for user details
export const userDetailsSchema = z
    .object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
        city: z.string().optional(),
        occupation: z.string().optional(),
        description: z.string().optional(),
        fields: z
            .string()
            .array()
            .optional()
            .superRefine((val, ctx) => {
                if (val) {
                    val.forEach((lang) => {
                        if (FIELDS_OF_INTEREST.find((l) => l.value === lang)) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: 'Invalid field of interest',
                            });
                        }
                    });
                }
            }),
        languages: z
            .string()
            .array()
            .optional()
            .superRefine((val, ctx) => {
                if (val) {
                    val.forEach((lang) => {
                        if (LANGUAGES.find((l) => l.value === lang)) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: 'Invalid language',
                            });
                        }
                    });
                }
            }),
        socials: z.record(
            z.string(),
            z.string().superRefine((val, ctx) => {
                if (!val) return true;
                const platform = ctx.path[ctx.path.length - 1] as string;

                let isValid;
                switch (platform.toLocaleLowerCase()) {
                    case 'linkedin':
                        isValid = val.startsWith('https://linkedin');
                    case 'twitter':
                    case 'x':
                        isValid = val.startsWith('https://twitter') || val.startsWith('https://x');
                    case 'instagram':
                        isValid = val.startsWith('https://instagram');
                    case 'facebook':
                        isValid = val.startsWith('https://facebook');
                    case 'github':
                        isValid = val.startsWith('https://github');
                    default:
                        isValid = val.startsWith('https://');
                }

                console.log('Is valid:', isValid);

                if (!isValid) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `Invalid ${platform} URL`,
                    });
                }
            }),
        ),
    })
    .superRefine((data, ctx) => {
        if (countWordsFromHtml(data.description || '') > 250) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Description must be less than 250 words',
            });
        }
    });

export type UserDetailsSchema = z.infer<typeof userDetailsSchema>;
