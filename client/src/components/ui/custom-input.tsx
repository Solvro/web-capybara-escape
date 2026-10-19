import { colorVariants } from "../../constants/color-variants";

type TextColorValue =
  (typeof colorVariants.text)[keyof typeof colorVariants.text];
type BgColorValue = (typeof colorVariants.bg)[keyof typeof colorVariants.bg];

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
  placeholder?: string;
  textColor?: TextColorValue;
  bgColor?: BgColorValue;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
}

export function CustomInput({
  value,
  setValue,
  disabled,
  placeholder,
  textColor = colorVariants.text.violet,
  bgColor = colorVariants.bg.white,
  className = "",
  onBlur,
  onKeyDown,
  autoFocus,
}: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      className={`px-4 py-2 ${bgColor} ${textColor} rounded-sm text-center text-md tomorrow-font ${
        disabled ? "opacity-50 text-black" : ""
      } ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
    ></input>
  );
}
