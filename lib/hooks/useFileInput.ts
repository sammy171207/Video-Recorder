import { ChangeEvent, useRef, useState } from "react";

export const useFileInput = (maxSize: number) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // File size check
    if (selectedFile.size > maxSize) return;

    // Revoke old URL if exists
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // If it's a video, calculate duration
    if (selectedFile.type.startsWith("video")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        if (isFinite(video.duration) && video.duration > 0) {
          setDuration(Math.round(video.duration));
        } else {
          setDuration(0);
        }
        URL.revokeObjectURL(video.src);
      };
      video.src = objectUrl;
    }
  };

  const resetFile=()=>{
    if(previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(" ");
    setDuration(0)
    if(inputRef.current) inputRef.current.value=''
  }
  return {
    file,
    previewUrl,
    duration,
    inputRef,
    handleFileChange,
    resetFile
  };
};
