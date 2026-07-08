type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="rounded-md bg-black px-4 py-2 text-white"
    >
      {children}
    </button>
  );
}
