import { formatDate } from "@/utils/formatDate";

export function Footer() {
  return (
    <footer className="border-t px-6 py-4 text-sm text-zinc-500">
      Built with Frontend Init · {formatDate(new Date())}
    </footer>
  );
}
