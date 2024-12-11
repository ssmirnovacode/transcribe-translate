/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import FileDisplay from "./components/FileDisplay";
import Transcription from "./components/TranscriptionResult";
import Transcribing from "./components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(true);
  const [loading, setLoading] = useState(false);

  const isAudioAvailable = file || audioStream;

  useEffect;

  const handleAudioReset = () => {
    setAudioStream(null);
    setFile(null);
  };
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Transcription />
        ) : loading ? (
          <Transcribing isDownloading={loading} />
        ) : isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
