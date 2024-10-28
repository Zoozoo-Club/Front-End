import React, { useState } from "react";
import DropDown from "@/assets/icon-drop-down.svg?react";
type Props = {
  name: string;
  color: string;
  percent: string; //보유 퍼센테이지
  profit: string; //수익률
  amount: string; //수량
  price: string; //평균매입가
};
export default function StockItem({
  name,
  profit,
  color,
  price,
  amount,
  percent,
}: Props) {
  const [on, setOn] = useState<boolean>(false);
  return (
    <div className="top3-item flex flex-col rounded-lg shadow-lg border border-slate-100 shadow-slate-200 mb-2 py-3 px-4">
      <div
        className="flex items-center justify-between"
        onClick={() => {
          console.log("cliock");
          setOn((prev) => !prev);
        }}
      >
        <div className="left flex items-center">
          <div
            className={`w-4 h-4 rounded bg-[#${color}] inline-block`}
            style={{ background: `#${color}` }}
          ></div>
          <p className="leading-none pl-3">{name}</p>
        </div>
        <div className="right flex">
          <p className="pr-2">{percent}%</p>
          <DropDown width={10} className={`drop`} />
        </div>
      </div>
      {on && (
        <>
          {price && (
            <div className="flex items-center justify-between pt-2">
              <div className="left flex items-center">
                <div className="pl-1">
                  <p className="leading-none pb-1">평균 매입가</p>
                </div>
              </div>
              <p className="text-slate-400 font-light text-sm leading-none">
                {price}원
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="left flex items-center">
              <div className="pl-1">
                <p className="leading-none pb-1">보유 수량</p>
              </div>
            </div>
            <p className="text-slate-400 font-light text-sm leading-none">
              {amount}주
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="left flex items-center">
              <div className="pl-1">
                <p className="leading-none pb-1">수익률</p>
              </div>
            </div>
            <p className="text-slate-400 font-light text-sm leading-none">
              {profit}%
            </p>
          </div>
        </>
      )}
    </div>
  );
}
