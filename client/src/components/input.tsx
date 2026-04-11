interface InputProps {
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
  placeholder?: string;
  textColor?: string;
  bgColor?: string;
}

const textColorClasses: Record<string, string> = {
  violet: "text-violet-950",
  white: "text-white",
  black: "text-black",
  amber: "text-amber-950",
  slate: "text-slate-900",
};

const bgColorClasses: Record<string, string> = {
  white: "bg-white",
  slate: "bg-slate-100",
  violet: "bg-violet-100",
  amber: "bg-amber-100",
};

export function Input({
  value,
  setValue,
  disabled,
  placeholder,
  textColor = "violet",
  bgColor = "white",
}: InputProps) {
  const textClass = textColorClasses[textColor] ?? textColorClasses.violet;
  const bgClass = bgColorClasses[bgColor] ?? bgColorClasses.white;

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      className={`my-4 px-4 py-2 ${bgClass} ${textClass} w-2/3 rounded-2xl text-center text-sm ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      placeholder={placeholder}
      disabled={disabled}
    ></input>
  );
}
