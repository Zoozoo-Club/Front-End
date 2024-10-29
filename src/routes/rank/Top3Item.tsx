import ArrowRight from "@/assets/icon-arrow-right.svg?react";
import { formatNumber } from "@/lib/nums";
import { encodeText } from "@/lib/utils";
type Props = {
  name: string;
  profit: number;
  color: string;
  roi: number;
  code: string;
};
export default function Top3Item({ name, profit, color, roi, code }: Props) {
  const goToExternalSite = (stockCode: string) => {
    let market = "KOSDAQ";
    if (stockCode === "005930") {
      market = "KOSPI";
    }
    const strEncode = encodeText(`1110&&1&${stockCode}&S&${market}&`);
    window.open(`https://open.shinhansec.com/phone/goM.jsp?p=${strEncode}&v=2`);
  };
  return (
    <div
      className="top3-item flex justify-between pb-4"
      onClick={() => {
        goToExternalSite(code);
      }}
    >
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
