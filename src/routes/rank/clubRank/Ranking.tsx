import React, { useEffect, useMemo, useState } from "react";
import rankingAPI from "@/apis/rankingAPI";
import useSWR from "swr";
import { IClubZooZooInfoRes } from "@/apis/types";
import { useNavigate } from "react-router-dom";
import RankItem from "./RankItem";

export default function Ranking({ id }: { id: string }) {
  const navigate = useNavigate();
  // API 호출해서 데이터 겟
  const service = useMemo(() => new rankingAPI(), []);
  // 참여자
  const { data, error, isLoading } = useSWR<IClubZooZooInfoRes[]>(
    "club-rank",
    () => service.targetClubRanking(+id)
  );

  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }
  if (error) {
    navigate("/error");
  }

  return (
    <div>
      <div className="rank-container mx-4 my-2 rounded-lg shadow-lg border border-slate-100 shadow-slate-200 px-4 py-2">
        {data &&
          data.slice(0, 99).map((item, idx) => {
            return (
              <div key={idx}>
                {idx !== 0 && (
                  <div className="line bg-slate-200 h-[1px] w-full"></div>
                )}
                <RankItem
                  key={`${item.userId}-${idx}`}
                  onClick={() => {}}
                  no={idx + 1}
                  name={item.nickname}
                  roi={item.roi}
                  id={item.userId}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
