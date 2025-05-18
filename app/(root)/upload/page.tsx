'use client';

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const uploadFileToBunny=(file:File,uploadUrl:string,accessKey:string):Promise<void>=>{
    return fetch(uploadUrl,{
        method:'PUT',
        headers:{
            'Content-Type':file.type,
            AccessKey:accessKey
        },
        body:file,
    }).then((response)=>{
        if(!response.ok) throw new Error('upload failed')
    })
}

const Page = () => {

  const router=useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public'
  });
  const [videoDuration,setVideoDuration]=useState(0)
  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);
  const [error, setError] = useState<string | null>(null);

  const[isSubmitting,setIsSubmitting]=useState(false);

  useEffect(()=>{
    if(video.duration!==null ||0){
        setVideoDuration(video.duration)
    }
  },[video.duration])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    if (!video.file || !thumbnail.file) {
      setError("Please upload video and thumbnail");
      return;
    }
    if (!formData.title || !formData.description) {
      setError("Please fill in all the details");
      return;
    }

    //upload viddeo
    const{
        videoId,
        uploadUrl:videoUploadUrl,
        accessKey:videoAccessKey
    }=await getVideoUploadUrl();

    if(!videoUploadUrl|| !videoAccessKey) throw new Error('failed to get video upload credentials')

   //upload to bunny

   await uploadFileToBunny(video.file,videoUploadUrl,videoAccessKey);

   //thumnail 
       const{ 
        uploadUrl:thumbnailUploadUrl,
        accessKey:thumbnailAccessKey,
        cdnUrl:thumbnailCdnUrl,
    }=await getThumbnailUploadUrl(videoId);

        if(!thumbnailUploadUrl|| !thumbnailAccessKey|| !thumbnailCdnUrl) throw new Error('failed to get thumbnail upload credentials')

            await uploadFileToBunny(thumbnail.file,thumbnailUploadUrl,thumbnailAccessKey);
            await saveVideoDetails({
                videoId,
                thumbnailUrl:thumbnailCdnUrl,
                ...formData,
                duration:videoDuration

            })
    router.push(`/video/${videoId}`)
  } catch (error) {
    console.log("Error submitting form:", error);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>

      {error && <div className="error-field">{error}</div>}

      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>
        <FormField 
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a title"
        />

        <FormField 
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe what this video is about"
          as="textarea"
        />

        <FileInput 
          id="video"
          label="Video"
          accept="video/*"
          inputRef={video.inputRef} 
          file={video.file}
          previewUrl={video.previewUrl}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />

        <FileInput 
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          inputRef={thumbnail.inputRef}
          previewUrl={thumbnail.previewUrl}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />

        <FormField 
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          placeholder="Select visibility"
          as="select"
          options={[
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' }
          ]}
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting?'Uploading...':'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default Page;
