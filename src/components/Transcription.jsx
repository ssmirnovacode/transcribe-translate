/* eslint-disable react/prop-types */
export default function Transcription({ output = {} }) {
  return <div>{output[0]?.text}</div>;
}
