import { z } from 'zod';
import { PW_REGEX } from './constants';

export const registerSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .regex(
                PW_REGEX,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            ),
        confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match",
                path: ['confirmPassword'],
            });
        }
    });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
