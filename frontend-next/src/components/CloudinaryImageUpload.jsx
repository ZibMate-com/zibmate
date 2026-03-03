"use client";
import React, { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function CloudinaryImageUpload({ imagePreviews = [], onImagesChange, maxImages = 10 }) {
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (files) => {
    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", "pg-images");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Upload failed for " + file.name);
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);
      }

      // Merge with existing previews
      onImagesChange([...imagePreviews, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = maxImages - imagePreviews.length;

    if (files.length > remainingSlots) {
      toast.error(`You can only upload ${remainingSlots} more image(s)`);
      return;
    }

    uploadToCloudinary(files);
  };

  const removeImage = (index) => {
    const updated = imagePreviews.filter((_, i) => i !== index);
    onImagesChange(updated);
    toast.success("Image removed");
  };

  return (
    <div className="space-y-4">
      <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">
        Upload Property Photos {uploading && <span className="text-orange-500">(Uploading...)</span>}
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {imagePreviews.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100">
            <img src={url} className="w-full h-full object-cover" alt={`Preview ${index + 1}`} />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {imagePreviews.length < maxImages && (
          <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-orange-500 hover:text-orange-500 transition-all bg-slate-50 cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*"
              disabled={uploading}
            />
            {uploading ? (
              <>
                <Upload size={24} className="animate-pulse" />
                <span className="text-[10px] font-bold mt-1 uppercase">Uploading...</span>
              </>
            ) : (
              <>
                <Plus size={24} />
                <span className="text-[10px] font-bold mt-1 uppercase">Add Photo</span>
              </>
            )}
          </label>
        )}
      </div>

      <p className="text-xs text-slate-400 ml-1">
        {imagePreviews.length} of {maxImages} images uploaded
      </p>
    </div>
  );
}
