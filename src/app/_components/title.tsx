export default function Title() {
  return (
    <header className="flex w-full flex-col items-center justify-center gap-2 text-center sm:w-auto sm:flex-row sm:items-center sm:gap-5 sm:text-left">
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#03c75a] text-3xl font-black text-white shadow-md sm:h-16 sm:w-16 sm:text-4xl">
          N
        </span>
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Naver Shortcut</h1>
          <p className="text-sm text-gray-500 sm:text-base">즐겨찾는 서비스를 한곳에서 빠르게 열어보세요</p>
        </div>
      </div>
    </header>
  );
}
