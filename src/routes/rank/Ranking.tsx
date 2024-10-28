import { useEffect, useMemo, useState } from "react";
// import dummyRank from "@/dummy/dummyRank.json";
import RankItem from "./RankItem";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { IAllClubRankingInfoRes, MyClub } from "@/apis/types";
import rankingAPI from "@/apis/rankingAPI";
import {
  useAuthStore,
  useLoginModalStore,
  useNextUrlStore,
} from "@/store/store";
import clubAPI from "@/apis/clubAPI";
import Loading from "@/components/Loading";

export type RankType = "profit" | "assets" | "headCount";
export default function Ranking() {
  const [data, setData] = useState<IAllClubRankingInfoRes[]>([]);
  const [activeType, setActiveType] = useState<RankType>("profit");
  const [myRanking, setMyRanking] = useState<JSX.Element | null>(null);
  const token = useAuthStore((state) => state.token);
  const openLoginModal = useLoginModalStore((state) => state.openModal);
  const setNextUrl = useNextUrlStore((state) => state.setNextUrl);
  const navigate = useNavigate();
  // API 호출해서 데이터 겟
  const service = useMemo(() => new rankingAPI(), []);
  const clubService = useMemo(() => new clubAPI(), []);
  // 참여자
  const {
    data: userRankData,
    error: userRankError,
    isLoading: loading1,
  } = useSWR<IAllClubRankingInfoRes[]>("rank-by-user", () =>
    service.allClubRankingByUser()
  );
  // 투자금액
  const {
    data: amountRankData,
    error: amountRankError,
    isLoading: loading2,
  } = useSWR<IAllClubRankingInfoRes[]>("rank-by-amount", () =>
    service.allClubRankingByUserByAmount()
  );
  // 수익률
  const {
    data: roiRankData,
    error: roiRankError,
    isLoading: loading3,
  } = useSWR<IAllClubRankingInfoRes[]>("rank-by-roi", () =>
    service.allClubRankingByUserByROI()
  );
  const { data: myClubData, isLoading: loading4 } = useSWR<MyClub>(
    "myclub",
    () => clubService.getMyClub()
  );

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

  useEffect(() => {
    // if (loading1 || loading2 || loading3) return;
    // if (roiRankError || amountRankError || userRankError) return;
    if (!roiRankData || !amountRankData || !userRankData) return;

    if (activeType === "profit") {
      setData(roiRankData);
    }
    if (activeType === "assets") {
      setData(amountRankData);
    }
    if (activeType === "headCount") {
      setData(userRankData);
    }
  }, [activeType, amountRankData, roiRankData, userRankData]);

  if (loading1 || loading2 || loading3 || loading4) {
    return <Loading size="md" text="클럽 랭킹을 불러오는 중입니다" />;
  }
  if (roiRankError || amountRankError || userRankError) {
    // navigate("/error");
    return <div>Error</div>;
  }

  const handleRankItemClick = (clubId: string) => {
    if (!token) {
      setNextUrl(`/rank/club-rank/${clubId}`); // 로그인 후 이동할 URL 저장
      openLoginModal();
      return;
    }
    navigate(`club-rank/${clubId}`);
  };

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
              <div key={item.clubId}>
                {idx !== 0 && (
                  <div
                    className="line bg-slate-200 h-[1px] w-full"
                    key={idx}
                  ></div>
                )}
                <RankItem
                  key={`${item.clubId}-${idx}`}
                  onClick={() => handleRankItemClick(`${item.clubId}`)}
                  no={idx + 1}
                  name={item.clubName}
                  profit={item.roi}
                  id={item.clubId}
                  userCount={item.userCount}
                  totalAmount={item.totalAmount}
                  type={activeType}
                  imgId={item.code}
                />
              </div>
            );
          })}
      </div>
      <div className="my-ranking-container fixed w-full max-w-[576px] bottom-5 left-1/2 transform -translate-x-1/2 rounded-lg shadow-lg border border-blue-100 shadow-slate-200 px-6 py-4 pt-3 bg-white">
        {myRanking ? (
          <div>
            <h2 className="text-base font-bold absolute top-[4px] text-blue-800">
              내 클럽 랭킹
            </h2>
            {myRanking}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
