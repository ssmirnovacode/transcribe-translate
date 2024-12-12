/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function CopyDownloadButtons({ content }) {
  // @TODO
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download(`text-${new Date().toDateString()}.txt`);
    document.body.appendChild(element);
    element.click();
  };
  return (
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
  );
}
