'use server';

import serverClient from '@/db/server';
import { ChapterData, Palette, Preset } from '../types';

export const getCourseData = async (course_id: string, chapter_id: string) => {
    if (!course_id) throw new Error('Course_id should be provided and not empty');

    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!}/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET!}/${course_id}`;

    const chapter_result = await fetch(`${baseUrl}/${chapter_id}.json`, {
        method: 'GET',
    });

    const presets_result = await fetch(`${baseUrl}/presets.json`, {
        method: 'GET',
    });

    const palette_result = await fetch(`${baseUrl}/palette.json`, {
        method: 'GET',
    });

    if (!chapter_result.ok || !presets_result.ok || !palette_result.ok) {
        throw new Error('Error fetching data');
    }

    const chapter = (await chapter_result.json()) as ChapterData;
    const presets = (await presets_result.json()) as Preset[];
    const palette = (await palette_result.json()) as Palette;

    return {
        chapter,
        presets,
        palette,
    };
};

export const updateCourseData = async (course_id: string, id: string, data: ChapterData | Palette | Preset[]) => {
    if (!course_id) throw new Error('Course_id should be provided and not empty');
    if (!id) throw new Error('Chapter_id should be provided and not empty');

    const supabase = await serverClient();

    const path = `${course_id}/${id}.json`;
    const { data: upload_data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
        .upload(path, new Blob([JSON.stringify(data)], { type: 'application/json' }), {
            contentType: 'application/json',
            upsert: true,
        });
    if (error) throw new Error('Error uploading data');

    return { data: upload_data };
};
