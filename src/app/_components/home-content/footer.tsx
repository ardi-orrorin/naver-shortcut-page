export default function Footer() {
  const version = process.env.NEXT_PUBLIC_VERSION;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="absolute bottom-4 left-0 right-0 flex w-full items-center justify-center gap-2">
      <p className="text-sm text-gray-500">© {currentYear} Naver Shortcut Page. All rights reserved.</p>

      <p className="text-sm text-gray-500">Version: {version}</p>
    </footer>
  );
}
