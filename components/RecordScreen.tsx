"use client";
import { ICONS } from "@/constants";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useScreenRecording } from "@/lib/hooks/useuseScreenRecording";
import { useRouter } from "next/navigation";
import { duration } from "drizzle-orm/gel-core";
const RecordScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router=useRouter()
  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();
  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();
    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  };

const goToUpload = async () => {
  if (!recordedBlob) return;

  const url = URL.createObjectURL(recordedBlob);

  sessionStorage.setItem(
    'recordedVideo',
    JSON.stringify({
      url,
      name: 'screen-recording.webm',
      type: recordedBlob.type,
      size: recordedBlob.size,
      duration:  0,
    })
  );

  router.push('/upload');
};

  return (
    <div className="record">
      <button
        className="primary-btn flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Image src={ICONS.record} alt="Record icon" width={16} height={16} />
        <span>Record a Video</span>
      </button>

      {isOpen && (
        <section className="dialog">
          <div className="overlay-record" onClick={closeModal} />
            <div className="dialog-content">
              <figure>
                <h3>Screen Recording</h3>
                <button>
                  <Image src={ICONS.close} alt="close" width={20} height={20} />
                </button>
              </figure>

              <section>
                {isRecording ? (
                  <article>
                    <div />
                    <span>Recording in</span>
                  </article>
                ) : recordedVideoUrl ? (
                  <video ref={videoRef} src={recordedVideoUrl} controls />
                ) : (
                  <p>
                    Click Record to start capturing your useuseScreenRecording
                  </p>
                )}
              </section>

              <div className="record-box">
                {!isRecording && !recordedVideoUrl &&(<button onClick={handleStart} className="record-start">
                    <Image src={ICONS.record} alt="record" width={16} height={16}/>
                    Record
                </button>)}
                {isRecording && (<button onClick={stopRecording} className="record-stop">
                    <Image src={ICONS.record} alt="record" width={16} height={16}/>
                    Stop Recording
                </button>)}

                {recordedVideoUrl && (
                    <>
                    <button onClick={recordAgain} className="record-again">
                          Record Again
                        </button>
                        <button onClick={goToUpload} className="record-upload">
                            <Image src={ICONS.upload} alt="upload" width={16} height={16}/>

                        </button>
                        </>
                )}
              </div>
            </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;
