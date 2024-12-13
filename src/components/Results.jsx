/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Translation from "./Translation";
import Transcription from "./Transcription";

export default function Results(props) {
  let worker = useRef();

  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [toLanguage, setToLanguage] = useState("Select language");

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("initiate translation");
          break;
        case "progress":
          console.log("translation in progress");
          break;
        case "update":
          //setTranslation(e.data.output);
          break;
        case "complete":
          setTranslation(e.data.output?.[0]?.translation_text);
          setIsTranslating(false);
          console.log("translation complete");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const content =
    tab === "transcription" ? props.output?.[0]?.text : translation || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${tab}-${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const generateTranslation = () => {
    if (isTranslating || toLanguage === "Select language") {
      return;
    }

    setIsTranslating(true);

    worker.current.postMessage({
      text: props.output?.[0]?.text,
      src_language: "eng_Latn",
      tgt_lang: toLanguage,
    });
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
            text={content}
            toLanguage={toLanguage}
            isTranslating={isTranslating}
            generateTranslation={generateTranslation}
            setToLanguage={setToLanguage}
          />
        ) : (
          <Transcription text={content} />
        )}
      </div>

      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          onClick={handleCopy}
          title="copy"
          className="specialBtn p-2 rounded px-4 text-blue-400 hover:text-blue-600 duration-200"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="download"
          className="specialBtn p-2 rounded px-4 text-blue-400 hover:text-blue-600 duration-200"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
