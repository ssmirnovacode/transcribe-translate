import { useState } from "react";
import Translation from "./Translation";
import Transcription from "./Transcription";

export default function Results(props) {
  const [tab, setTab] = useState("transcription");
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20  mx-auto max-w-prose w-full">
      <h2 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-blue-400 bold">transcription</span>
      </h2>
      <div className="grid grid-cols-2 items-center  mx-auto bg-white  shadow rounded-full overflow-hidden">
        <button
          onClick={() => setTab("transcription")}
          className={`px-4 py-1 font-medium duration-200 ${
            tab === "transcription"
              ? "bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600"
          }`}
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={`px-4 py-1 font-medium duration-200 ${
            tab === "translation"
              ? "bg-blue-400 text-white"
              : "text-blue-400 hover:text-blue-600"
          }`}
        >
          Translation
        </button>
      </div>
      {tab === "translation" ? <Translation /> : <Transcription {...props} />}
    </main>
  );
}
