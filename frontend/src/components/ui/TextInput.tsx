"use client";

import { useState } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, className = "", ...props }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative w-full h-[56px] rounded-md bg-white flex flex-col justify-center px-3 transition-colors ${
        isFocused ? "border-[2px] border-ink" : "border-[1px] border-hairline"
      } ${className}`}
    >
      <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          isFocused || props.value
            ? "top-1.5 text-[12px] text-muted font-medium"
            : "top-4 text-[16px] text-muted font-normal"
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={`w-full bg-transparent outline-none text-[16px] text-ink pt-4 pb-1 ${
          isFocused || props.value ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
