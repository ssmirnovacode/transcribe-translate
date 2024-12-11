import { useRef, useState } from "react";

const MIME_TYPE = "audio/webm";

export default function HomePage({
  setFile = () => {},
  setAudioStream = () => {},
}) {
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20">
      <h2 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Transcribe & <span className="text-blue-400 bold">Translate</span>
      </h2>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl">
        <p className="text-blue-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
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
