import React, { useEffect, useMemo, useState } from "react";
import RankItem from "./RankItem";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { IAllClubRankingInfoRes, MyClub } from "@/apis/types";
import rankingAPI from "@/apis/rankingAPI";
import clubAPI from "@/apis/clubAPI";

export type RankType = "profit" | "assets" | "headCount";

export default function Ranking() {
  const [data, setData] = useState<IAllClubRankingInfoRes[]>([]);
  const [activeType, setActiveType] = useState<RankType>("profit");
  const [myRanking, setMyRanking] = useState<JSX.Element | null>(null);
  const navigate = useNavigate();

  const service = useMemo(() => new rankingAPI(), []);
  const clubService = useMemo(() => new clubAPI(), []);

  const {
    data: userRankData,
    error: userRankError,
    isLoading: loading1,
  } = useSWR<IAllClubRankingInfoRes[]>("rank-by-user", () =>
    service.allClubRankingByUser()
  );
  const {
    data: amountRankData,
    error: amountRankError,
    isLoading: loading2,
  } = useSWR<IAllClubRankingInfoRes[]>("rank-by-amount", () =>
    service.allClubRankingByUserByAmount()
  );
  const {
    data: roiRankData,
    error: roiRankError,
    isLoading: loading3,
  } = useSWR<IAllClubRankingInfoRes[]>("rank-by-roi", () =>
    service.allClubRankingByUserByROI()
  );
  const {
    data: myClubData,
    error: myClubError,
    isLoading: loading4,
  } = useSWR<MyClub>("myclub", () => clubService.getMyClub());

  useEffect(() => {
    if (!roiRankData || !amountRankData || !userRankData || !myClubData) return;

    switch (activeType) {
      case "profit":
        setData(roiRankData);
        break;
      case "assets":
        setData(amountRankData);
        break;
      case "headCount":
        setData(userRankData);
        break;
      default:
        break;
    }
  }, [activeType, roiRankData, amountRankData, userRankData, myClubData]);

  useEffect(() => {
    if (!myClubData) return;
    const foundRanking = data.find((item) => item.clubId === myClubData.clubId);
    if (foundRanking) {
      setMyRanking(
        <RankItem
          key={foundRanking.clubId}
          onClick={() => {
            navigate(`club-rank/${foundRanking.clubId}`);
          }}
          no={data.indexOf(foundRanking) + 1}
          name={foundRanking.clubName}
          profit={foundRanking.roi}
          id={foundRanking.clubId}
          userCount={foundRanking.userCount}
          totalAmount={foundRanking.totalAmount}
          type={activeType}
          imgId={foundRanking.code}
        />
      );
    }
  }, [data]);

  if (loading1 || loading2 || loading3 || loading4) {
    return (
      <div>
        <p>로딩 중...</p>
      </div>
    );
  }
  if (roiRankError || amountRankError || userRankError || myClubError) {
    navigate("/error");
  }

  return (
    <div>
      <div className="flex gap-2 p-3">
        <div
          className={`btn text-xs p-1 px-2 rounded-full ${
            activeType === "profit" ? "bg-[#CBD9FF]" : "bg-slate-200"
          }`}
          onClick={() => setActiveType("profit")}
        >
          수익률
        </div>
        <div
          className={`btn text-xs p-1 px-2 rounded-full ${
            activeType === "assets" ? "bg-[#CBD9FF]" : "bg-slate-200"
          }`}
          onClick={() => setActiveType("assets")}
        >
          투자총액
        </div>
        <div
          className={`btn text-xs p-1 px-2 rounded-full ${
            activeType === "headCount" ? "bg-[#CBD9FF]" : "bg-slate-200"
          }`}
          onClick={() => setActiveType("headCount")}
        >
          참여자 수
        </div>
      </div>
      <div className="rank-container mx-4 my-2 rounded-lg shadow-lg border border-slate-100 shadow-slate-200 px-4 py-2">
        {data.map((item, idx) => (
          <React.Fragment key={item.clubId}>
            {idx !== 0 && (
              <div className="line bg-slate-200 h-[1px] w-full"></div>
            )}
            <RankItem
              onClick={() => {
                navigate(`club-rank/${item.clubId}`);
              }}
              no={idx + 1}
              name={item.clubName}
              profit={item.roi}
              id={item.clubId}
              userCount={item.userCount}
              totalAmount={item.totalAmount}
              type={activeType}
              imgId={item.code}
            />
          </React.Fragment>
        ))}
      </div>
      {/* myRanking을 하단 중앙에 고정 */}
      <div className="my-ranking-container fixed w-full max-w-[576px] bottom-5 left-1/2 transform -translate-x-1/2 rounded-lg shadow-lg border border-slate-100 shadow-slate-200 px-6 py-4 bg-white">
        {myRanking ? (
          <div>
            <h2 className="text-lg font-bold">내 랭킹</h2>
            {myRanking}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
