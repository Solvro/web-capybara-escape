import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  onClick,
  disabled,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2 bg-primary-foreground text-black rounded-sm hover:bg-secondary hover:text-gray-200 hover:shadow-black text-md shadow-md shadow-white border-2 border-white",
        className,
        disabled
          ? "cursor-not-allowed opacity-25 hover:bg-primary-foreground hover:text-black hover:shadow-white hover:border-white"
          : "cursor-pointer",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
