/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Translation from "./Translation";
import Transcription from "./Transcription";

export default function Results(props) {
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [toLanguage, setToLanguage] = useState(null);

  const content =
    tab === "transcription" ? props.output?.[0]?.text : "translation wip...";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download(`${tab}-${new Date().toDateString()}.txt`);
    document.body.appendChild(element);
    element.click();
  };

  const generateTranslation = () => {
    if (isTranslating || toLanguage === "Select language") {
      return;
    }
  };

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
      <div className="my-8 flex flex-col">
        {tab === "translation" ? (
          <Translation
            translation={translation}
            text={content}
            toLanguage={toLanguage}
            isTranslating={isTranslating}
            generateTranslation={generateTranslation}
          />
        ) : (
          <Transcription text={content} />
        )}
      </div>

      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          title="copy"
          className="specialBtn p-2 rounded px-4 text-blue-400 hover:text-blue-600 duration-200"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          title="download"
          className="specialBtn p-2 rounded px-4 text-blue-400 hover:text-blue-600 duration-200"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
