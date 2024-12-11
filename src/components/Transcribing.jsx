/* eslint-disable react/prop-types */
export default function Transcribing({ isDownloading = false }) {
  return (
    <div className="flex-1 flex items-center flex-col justify-center gap-10 md:gap-14 pb-24 p-4 text-center">
      <div className="flex flex-col gap-2 sm:gap-4">
        <h2 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
          <span className="text-blue-400 bold">Transcribing</span>
          <p className="text-base">
            {isDownloading ? "warming up cylinders..." : "...engine running"}
          </p>
        </h2>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 max-w-[400px] mx-auto w-full">
        {[0, 1, 2].map((val) => (
          <div
            key={val}
            className={`rounded-full h-2 sm:h-3 bg-slate-400 loading loading${val}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
