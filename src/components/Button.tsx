"use client";

import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type VARIANT = "blue" | "white";

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  text: string;
  variant?: VARIANT;
  className?: string;
  style?: object;
};
export default function Button({
  disabled = false,
  isLoading = false,
  onClick: click,
  children,
  text,
  variant = "blue",
  className = "",
  style = {},
}: Props) {
  return (
    <button
      className={` rounded-lg w-full text-center py-2 mb-4 min-h-9 transition ease-in-out delay-150 ${
        disabled && "bg-stock-dark-300 shadow-none"
      } ${!disabled && "btn-" + variant} ${className}`}
      onClick={click}
      disabled={disabled || isLoading}
      style={style}
    >
      {isLoading && (
        <AiOutlineLoading className="animate-spin m-auto" color={"white"} />
      )}
      {!isLoading && children}
      {!isLoading && !children && (
        <p
          className={`text-white text-stock-blue-50 ${
            disabled && "text-stock-dark-500"
          }`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
