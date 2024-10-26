import React from "react";
import { BsSearch } from "react-icons/bs";

type Props = {
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ placeholder, onChange }: Props) {
  return (
    <div className="w-full p-3 flex justify-center items-center rounded-lg bg-white border border-1 border-stock-dark-200">
      <input
        onChange={onChange}
        className="w-full px-2 font-ptr "
        type="text"
        placeholder={placeholder}
        style={{ outline: "none" }}
      />
      <BsSearch className="w-6 h-6 m-1 text-stock-dark-300" />
    </div>
  );
}
