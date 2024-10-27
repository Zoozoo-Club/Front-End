import React, { useEffect, useState } from "react";
import dummyRank from "@/dummy/dummyRank.json";
import RankItem from "./RankItem";
interface IRankInfo {
  no: number;
  clubName: string;
  profit: string;
  id: string;
  imgId: string;
}
type RankType = "profit" | "assets" | "headCount";
export default function Ranking() {
  const [data, setData] = useState<IRankInfo[]>(dummyRank.clubRank);
  const [activeType, setActiveType] = useState<RankType>("profit");

  useEffect(() => {
    if (activeType === "profit") {
      setData(dummyRank.clubRank);
    }
    if (activeType === "assets") {
      setData(dummyRank.clubRank);
    }
    if (activeType === "headCount") {
      setData(dummyRank.clubRank);
    }
  }, [activeType]);
  return (
    <div>
      <div className="flex gap-2 p-3">
        <div
          className={`btn text-xs p-1 px-2 rounded-full ${
            activeType === "profit" ? "bg-[#CBD9FF]" : "bg-slate-200"
          }`}
          onClick={() => {
            setActiveType("profit");
          }}
        >
          수익률
        </div>
        <div
          className={`btn text-xs p-1 px-2 rounded-full ${
            activeType === "assets" ? "bg-[#CBD9FF]" : "bg-slate-200"
          }`}
          onClick={() => {
            setActiveType("assets");
          }}
        >
          투자총액
        </div>
        <div
          className={`btn text-xs p-1 px-2 rounded-full ${
            activeType === "headCount" ? "bg-[#CBD9FF]" : "bg-slate-200"
          }`}
          onClick={() => {
            setActiveType("headCount");
          }}
        >
          참여자 수
        </div>
      </div>
      <div className="rank-container mx-4 my-2 rounded-lg shadow-lg border border-slate-100 shadow-slate-200 px-4 py-2">
        {data &&
          data.map((item, idx) => {
            return (
              <>
                {idx !== 0 && (
                  <div
                    className="line bg-slate-200 h-[1px] w-full"
                    key={idx}
                  ></div>
                )}
                <RankItem
                  key={`${item.id}-${idx}`}
                  onClick={() => {}}
                  no={item.no}
                  name={item.clubName}
                  profit={item.profit}
                  id={item.id}
                  imgId={item.imgId}
                />
              </>
            );
          })}
      </div>
    </div>
  );
}
