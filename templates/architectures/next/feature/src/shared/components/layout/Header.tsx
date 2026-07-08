import Link from "next/link";
import { Button } from "@/shared/components/common/Button";
import { HOME_ROUTES } from "@/features/home/constants/routes";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <Link href={HOME_ROUTES.HOME} className="text-lg font-semibold">
        Feature App
      </Link>
      <nav className="flex items-center gap-3">
        <Link href={HOME_ROUTES.PROFILE} className="text-sm text-zinc-600">
          Profile
        </Link>
        <Button>Explore</Button>
      </nav>
    </header>
  );
}
