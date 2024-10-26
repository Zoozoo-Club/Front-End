import React from "react";
import "./style.css";
type Props = {
  selectedMenu: "story" | "stock";
  onRank: () => void;
  onInfo: () => void;
};
function Menu({ selectedMenu, onRank, onInfo }: Props) {
  return (
    <div className="w-full h-12 border-solid border-b-2  border-slate-200 flex relative">
      <div
        onClick={onRank}
        className={`${
          selectedMenu === "story" ? "" : "text-slate-300"
        } w-1/2 flex justify-center items-center `}
      >
        <p className="text-center">스토리</p>
      </div>
      <div
        onClick={onInfo}
        className={`${
          selectedMenu === "stock" ? "" : "text-slate-300"
        } w-1/2 flex justify-center items-center `}
      >
        <p className="text-center">보유 종목</p>
      </div>
      <div
        className={`w-1/2 absolute bg-black h-[2px] bottom-0 line ${
          selectedMenu === "stock" ? "move-right" : ""
        }`}
      ></div>
    </div>
  );
}

export default Menu;
