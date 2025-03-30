'use server';

import serverClient from '@/db/server';
import { Preset } from '../types';

export const createPublicPreset = async (user_id: string, preset: Preset | undefined) => {
    if (!user_id) throw new Error('Course_id should be provided and not empty');
    if (!preset) throw new Error('Preset should be provided and not empty');

    const supabase = await serverClient();

    const { error } = await supabase.from('public_presets').insert([
        {
            name: preset.name,
            globalstyle: preset.globalStyle,
            type: preset.type,
            styleperdevice: JSON.stringify(preset.stylePerDevice),
            content: preset.content ? JSON.stringify(preset.content) : null,
            formcontent: preset.formContent ? JSON.stringify(preset.formContent) : null,
            user_id,
        },
    ]);

    if (error) throw new Error('Error creating media');

    return true;
};

export const getPublicPresets = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase.from('public_presets').select('*');

    if (error) throw new Error('Error fetching data');

    return data;
};

export const deletePublicPreset = async (preset_id: string) => {
    if (!preset_id) throw new Error('Preset_id should be provided and not empty');

    const supabase = await serverClient();

    const { error } = await supabase.from('public_presets').delete().eq('id', preset_id);

    if (error) throw new Error('Error deleting preset');

    return true;
};
