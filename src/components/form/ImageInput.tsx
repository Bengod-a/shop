"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageInputProps {
  onFileChange: (file: File | null) => void;
  currentImageUrl?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({onFileChange, currentImageUrl,}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onFileChange(file);
    }
  };

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*png,image/jpeg,image/jpg"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-700 file:text-white
            hover:file:bg-gray-600
            cursor-pointer"
        />
        <p className="text-sm text-gray-400 mt-2">
          Supported formats: JPG, PNG (Max: 5MB)
        </p>
      </div>

      {previewUrl && (
        <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-700">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
