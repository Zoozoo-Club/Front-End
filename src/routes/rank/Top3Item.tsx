import React from "react";
import ArrowRight from "@/assets/icon-arrow-right.svg?react";
type Props = {
  name: string;
  profit: string;
  color: string;
  price: string;
};
export default function Top3Item({ name, profit, color, price }: Props) {
  return (
    <div className="top3-item flex justify-between pb-4">
      <div className="left flex items-center">
        <div
          className={`w-4 h-4 rounded inline-block`}
          style={{ background: `#${color}` }}
        ></div>
        <div className="pl-3">
          <p className="leading-none pb-1">{name}</p>
          <p className="text-slate-400 font-light text-sm leading-none">
            1주 평균 {price}원
          </p>
        </div>
      </div>
      <div className="right flex">
        <p className="">{profit}%</p>
        <ArrowRight />
      </div>
    </div>
  );
}
