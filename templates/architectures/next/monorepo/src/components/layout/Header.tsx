import Link from "next/link";
import { Button } from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href={ROUTES.HOME} className="text-lg font-semibold">
        Frontend Init
      </Link>
      <nav className="flex items-center gap-3">
        <Link href={ROUTES.ABOUT} className="text-sm text-zinc-600">
          About
        </Link>
        <Button>Get Started</Button>
      </nav>
    </header>
  );
}
