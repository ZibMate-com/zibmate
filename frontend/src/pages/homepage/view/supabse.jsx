import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = 'https://rwgrbxtcyuglylpxqrot.supabase.co';
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Z3JieHRjeXVnbHlscHhxcm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODk3NTQsImV4cCI6MjA3ODM2NTc1NH0.nh6rn6BQz8n1DyMjL9K1k2YoXv2tpYMw1V7dt-u4y1o";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { data, error } = await supabase.from("images").insert([{ url: "/assets/pgimage1.png" }]);

console.log(data, error);

export const ImageUploader =()=>{
    return
}