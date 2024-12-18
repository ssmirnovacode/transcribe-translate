/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const MIME_TYPE = "audio/webm";

export default function HomePage({
  setFile = () => {},
  setAudioStream = () => {},
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audiochunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    let tempStream;
    console.log("Recording started...");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.error(err);
      return;
    }

    setIsRecording(true);

    const media = new MediaRecorder(tempStream, { type: MIME_TYPE });
    mediaRecorder.current = media; // @TODO move to the end
    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data === undefined) return;
      if (!event.data.size) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    console.log("Stopped recording.");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audiochunks, { type: MIME_TYPE });
      setAudioStream(audioBlob); // saving data in state
      setAudioChunks([]); // resetting to default
      setDuration(0);
    };
  };

  useEffect(() => {
    // shows recording timer
    if (!isRecording) return;

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20">
      <h2 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Transcribe & <span className="text-blue-400 bold">Translate</span>
      </h2>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl"
      >
        <p className="text-blue-400">
          {isRecording ? `Stop recording` : "Record"}
        </p>
        <div className="flex items-center gap-2">
          {duration ? <p className="text-sm">{duration}s</p> : <></>}
          <i
            className={`fa-solid fa-microphone duration-200 ${
              isRecording && "text-rose-300"
            }`}
          ></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-blue cursor-pointer hover:text-blue-400 duration-200">
          upload{" "}
          <input
            className="hidden"
            type="file"
            accept=".mp3,.wave"
            onChange={(e) => {
              const uploadedFile = e.target.files[0];
              setFile(uploadedFile);
            }}
          />
        </label>{" "}
        an mp3 file
      </p>
      <p className="italic text-slate-400">Some description...</p>
    </main>
  );
}
