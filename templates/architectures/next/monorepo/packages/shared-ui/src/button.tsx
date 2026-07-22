import { cn } from "@project/shared-ui/utils/cn";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition",
        variant === "primary" && "bg-zinc-900 text-white hover:bg-zinc-700",
        variant === "secondary" && "border bg-white text-zinc-900 hover:bg-zinc-100",
        className
      )}
    >
      {children}
    </button>
  );
}
