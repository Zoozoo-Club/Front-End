import { RankType } from "./Ranking";
import { truncateToEok, truncateToTwoDecimals } from "@/lib/nums";
const { VITE_STOCK_IMG_URL, VITE_STOCK_IMG_URLB } = import.meta.env;

type Props = {
  no: number;
  name: string;
  profit: number;
  id: number;
  imgId?: string | null;
  userCount: number;
  totalAmount: number;
  type: RankType;
  onClick: () => void;
};
export default function RankItem({
  no,
  name,
  profit,
  id,
  imgId,
  type,
  totalAmount,
  userCount,
  onClick,
}: Props) {
  return (
    <div
      className="flex justify-between py-4"
      onClick={onClick}
      id={`club-rank-${id}`}
    >
      <div className="left flex items-center">
        <p className="w-7 pr-2 font-semibold text-lg inline-block">{no} </p>
        {imgId ? (
          <img
            className="w-8 rounded-xl inline"
            src={`${VITE_STOCK_IMG_URL}${imgId}${VITE_STOCK_IMG_URLB}`}
            alt={`${name}-logo`}
          />
        ) : (
          <div className="w-8 h-8 inline-block bg-slate-300 rounded-xl"></div>
        )}
        <span className="pl-3 font-semibold whitespace-nowrap truncate">
          {name} 클럽
        </span>
      </div>
      {type === "profit" && (
        <div
          className={`right text-xl ${
            profit === 0
              ? "text-slate-500"
              : profit > 0
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          {profit > 0 && "+"}
          {truncateToTwoDecimals(profit)}%
        </div>
      )}
      {type === "assets" && (
        <div className={`right text-xl whitespace-nowrap`}>
          {truncateToEok(totalAmount)}
        </div>
      )}
      {type === "headCount" && (
        <div className={`right text-xl`}>{userCount}명</div>
      )}
    </div>
  );
}
