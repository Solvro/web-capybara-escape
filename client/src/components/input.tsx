interface InputProps {
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
  placeholder?: string;
  textColor?: string;
  bgColor?: string;
}

export function Input({
  value,
  setValue,
  disabled,
  placeholder,
  textColor = "violet",
  bgColor = "white",
}: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      className={`my-4 px-4 py-2 bg-${bgColor} text-${textColor}-950 w-2/3 rounded-2xl text-center text-sm ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      placeholder={placeholder}
      disabled={disabled}
    ></input>
  );
}
