import React, { useState } from "react";


interface UploadFormProps {
    image: File | null;
    setImage: (image: File) => void;
    }
const UploadForm = ({image,setImage}:UploadFormProps) => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image as Blob);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        onChange={(e) => {
            e.target.files && setImage(e.target.files?.[0]);
        }}
        required
      />
      <button type="submit" value="Upload">
        Save History
      </button>
    </form>
  );
};

export default UploadForm;
