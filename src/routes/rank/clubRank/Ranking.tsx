import { useMemo } from "react";
import rankingAPI from "@/apis/rankingAPI";
import useSWR from "swr";
import { IClubZooZooInfoRes } from "@/apis/types";
import { useNavigate } from "react-router-dom";
import RankItem from "./RankItem";
import Loading from "@/components/Loading";

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
    return <Loading size="md" text="랭킹 정보를 불러오는 중입니다" />;
  }
  if (error) {
    // navigate("/error");
    return <div>Error</div>;
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
                  onClick={() => {
                    navigate(`/profile/${item.userId}`);
                  }}
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
