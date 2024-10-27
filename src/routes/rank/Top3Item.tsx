import ArrowRight from "@/assets/icon-arrow-right.svg?react";
import { formatNumber } from "@/lib/nums";
type Props = {
  name: string;
  profit: number;
  color: string;
  roi: number;
};
export default function Top3Item({ name, profit, color, roi }: Props) {
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
            평균 수익률{" "}
            <span className={`${roi > 0 ? "text-red-500" : "text-blue-500"}`}>
              {formatNumber(roi, 2)}%
            </span>
          </p>
        </div>
      </div>
      <div className="right flex">
        <p className="">{formatNumber(profit, 1)}%</p>
        <ArrowRight />
      </div>
    </div>
  );
}
