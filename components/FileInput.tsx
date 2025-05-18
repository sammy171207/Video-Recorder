import Image from 'next/image';
import React from 'react';

const FileInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => {
  return (
    <section className="file-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="file"
        id={id}
        accept={accept}
        ref={inputRef}
        hidden
        onChange={onChange}
      />

      {!previewUrl ? (
        <figure onClick={() => inputRef.current?.click()} className="cursor-pointer text-center p-4 border border-dashed rounded-lg">
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <p className="text-sm mt-2">Click to upload your {id}</p>
        </figure>
      ) : (
        <div className="relative w-full max-w-sm">
          {type === 'video' ? (
            <video src={previewUrl} controls />
          ) : 
              <Image
                src={previewUrl}
                alt="preview"
                fill
                className="object-contain rounded"
              />
         
          }

          <button
            type="button"
            onClick={onReset}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
          >
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={16}
              height={16}
            />
          </button>
          <p className="text-sm mt-2 truncate">{file?.name}</p>
        </div>
      )}
    </section>
  );
};

export default FileInput;
