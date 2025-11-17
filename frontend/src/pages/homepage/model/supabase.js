import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://rwgrbxtcyuglylpxqrot.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Z3JieHRjeXVnbHlscHhxcm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODk3NTQsImV4cCI6MjA3ODM2NTc1NH0.nh6rn6BQz8n1DyMjL9K1k2YoXv2tpYMw1V7dt-u4y1o');

async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from('zimate-images') 
    .upload(`uploads/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false, 
    });

  if (error) {
    console.error('Upload failed:', error.message);
  } else {
    console.log('Uploaded successfully:', data);
  }
}
export default uploadFile;