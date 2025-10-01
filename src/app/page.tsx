import jsToBase64Func from "@/app/_utils/funcs/jsToBase64";
import HomeContent from "./_components/home-content";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const rawParam = (await searchParams).shortcuts;
  const loadShortcuts = jsToBase64Func.decodeFromUrl(rawParam as string);

  return <HomeContent {...{ loadShortcuts }} />;
}
