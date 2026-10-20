import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  setValue: (value: string) => void;
  options: SelectOption[];
  disabled: boolean;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  value,
  setValue,
  options,
  disabled,
  placeholder,
  className = "",
}: SelectProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <Listbox value={value} onChange={setValue} disabled={disabled}>
      <ListboxButton
        className={`flex items-center justify-between gap-2 rounded-2xl bg-white px-4 py-2 text-sm text-violet-950 ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        } ${className}`}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <ChevronDown size={16} className="shrink-0" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="arcade-font z-[70] max-h-48 w-(--button-width) overflow-y-auto rounded-lg border-2 border-violet-400 bg-violet-950 p-1 text-sm text-white shadow-lg [--anchor-gap:4px] focus:outline-none"
      >
        {options.map((option) => (
          <ListboxOption
            key={option.value}
            value={option.value}
            className="cursor-pointer rounded-md px-3 py-2 data-focus:bg-violet-500 data-selected:text-amber-300"
          >
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
