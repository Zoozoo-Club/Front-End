import { truncateToTwoDecimals } from "@/lib/nums";
import Avatar from "boring-avatars";
import React from "react";

type Props = {
  no: number;
  roi: number;
  name: string;
  id: string;
  onClick: () => void;
};
export default function RankItem({ no, name, id, roi, onClick }: Props) {
  return (
    <div
      className="flex justify-between py-4"
      onClick={onClick}
      id={`club-rank-${id}`}
    >
      <div className="left">
        <p className="w-7 pr-2 font-semibold text-lg inline-block">{no} </p>
        <Avatar width={32} variant="beam" name={name} />
        <span className="pl-3 font-semibold">{name} 클럽</span>
      </div>
      <div
        className={`right text-xl ${
          roi === 0
            ? "text-slate-500"
            : roi > 0
            ? "text-red-500"
            : "text-blue-500"
        }`}
      >
        {roi > 0 && "+"}
        {truncateToTwoDecimals(roi)}%
      </div>
    </div>
  );
}
