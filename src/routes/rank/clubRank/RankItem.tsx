import { truncateToTwoDecimals } from "@/lib/nums";
import Avatar from "boring-avatars";

type Props = {
  no: number;
  roi: number;
  name: string;
  id: number;
  onClick: () => void;
};
export default function RankItem({ no, name, id, roi, onClick }: Props) {
  return (
    <div
      className="flex justify-between py-4"
      onClick={onClick}
      id={`club-rank-${id}`}
    >
      <div className="left flex">
        <p className="w-7 pr-2 font-semibold text-lg inline-block">{no} </p>
        <Avatar width={32} variant="beam" name={name} />
        <span className="pl-3 font-semibold">{name}</span>
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
