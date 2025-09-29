import jsToBase64Func from "@/app/_utils/funcs/jsToBase64";
import BookmarkHelpModal from "./_components/bookmark-help-modal";
import MoreShortcut from "./_components/more-shortcut";
import SearchBox from "./_components/search-box";
import SelectedShortcuts from "./_components/selected-shortcuts";
import Title from "./_components/title";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const rawParam = (await searchParams).shortcuts;
  const loadShortcuts = jsToBase64Func.decodeFromUrl(rawParam as string);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 py-10">
      <BookmarkHelpModal />
      <Title />
      <SearchBox />
      {loadShortcuts.length > 0 && <SelectedShortcuts ids={loadShortcuts} />}
      <MoreShortcut {...{ loadShortcuts }} />
    </div>
  );
}
