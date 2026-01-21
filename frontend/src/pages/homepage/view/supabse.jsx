import React, { useState } from "react";
import { supabase } from "../../../lib/supabase"


const { data, error } = await supabase.from("images").insert([{ url: "/assets/pgimage1.png" }]);

console.log(data, error);

export const ImageUploader = () => {
    return
}