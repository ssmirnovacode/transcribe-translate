export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <a href="/">
        <h2 className="font-medium">
          Transcript & <span className="text-blue-400">Translate</span>
        </h2>
      </a>
      <a
        href="/"
        className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-blue-400 text-sm"
      >
        <p>NEW</p>
        <i className="fa-solid fa-plus"></i>
      </a>
    </header>
  );
}
