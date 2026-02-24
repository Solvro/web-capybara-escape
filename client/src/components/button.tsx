interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  textColor?: string;
  bgColor?: string;
  children: React.ReactNode;
}

export function Button({
  onClick,
  disabled,
  textColor = "white",
  bgColor = "green",
  children,
}: ButtonProps) {
  return (
    <button
      className={`w-2/3 px-6 py-2 bg-${bgColor}-500 text-${textColor} rounded-2xl hover:bg-${bgColor}-600 text-sm ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
