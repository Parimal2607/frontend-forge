import { formatDate } from "@/shared/utils/formatDate";

export function Footer() {
  return (
    <footer className="border-t px-6 py-4 text-sm text-zinc-500">
      Feature-based starter · {formatDate(new Date())}
    </footer>
  );
}
