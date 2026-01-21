import { supabase } from '../lib/supabase';

/**
 * Uploads a file to Supabase Storage
 * @param {File} file - The file object to upload
 * @param {string} bucket - The storage bucket name (default: 'zimate-images')
 * @returns {Promise<{path: string, publicUrl: string}>} - Upload result
 */
export const uploadFile = async (file, bucket = 'zimate-images') => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return {
            path: data.path,
            publicUrl: publicUrl
        };

    } catch (error) {
        console.error('Supabase Upload Error:', error.message);
        throw error;
    }
};
