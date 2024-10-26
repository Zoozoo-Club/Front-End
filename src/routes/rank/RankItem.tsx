import React from "react";
const { VITE_STOCK_IMG_URL, VITE_STOCK_IMG_URLB } = import.meta.env;

type Props = {
  no: number;
  name: string;
  profit: string;
  id: string;
  imgId: string;
  onClick: () => void;
};
export default function RankItem({
  no,
  name,
  profit,
  id,
  imgId,
  onClick,
}: Props) {
  return (
    <div
      className="flex justify-between py-4"
      onClick={onClick}
      id={`club-rank-${id}`}
    >
      <div className="left">
        <p className="w-7 pr-2 font-semibold text-lg inline-block">{no} </p>
        <img
          className="w-8 rounded-xl inline"
          src={`${VITE_STOCK_IMG_URL}${imgId}${VITE_STOCK_IMG_URLB}`}
          alt={`${name}-logo`}
        />
        <span className="pl-3 font-semibold">{name} 클럽</span>
      </div>
      <div
        className={`right text-xl ${
          Number(profit) === 0
            ? "text-slate-500"
            : Number(profit) > 0
            ? "text-red-500"
            : "text-blue-500"
        }`}
      >
        {Number(profit) > 0 && "+"}
        {profit}%
      </div>
    </div>
  );
}
