import ChartPortfolio from "@/components/ChartPortfolio";
import { useLoginModalStore } from "@/store/store";
import ArrowRight from "@/assets/icon-arrow-right.svg?react";
import React, { useMemo } from "react";
import Top3Item from "./Top3Item";
import RecommendItem from "./RecommendItem";
import { useNavigate } from "react-router-dom";
import clubAPI from "@/apis/clubAPI";
import useSWR from "swr";
import { IClubCurrentPrice, MyClub } from "@/apis/types";

interface IRecommendBond {
  profit: number;
  name: string;
  category: string;
  risk: number;
  url?: string;
}
//수익률이 클럽 수익률보다 높은것 중 안전순위가 높은 순으로 3개정도 노출
//판매 중개 장외
const dummyRe: IRecommendBond[] = [
  {
    profit: 14.15,
    name: "미국국채(50)",
    category: "해외(판매)",
    risk: 5,
    url: "www.naver.com",
  },
  {
    profit: 13.15,
    name: "미국국채(50)",
    category: "해외(판매)",
    risk: 4,
    url: "www.naver.com",
  },
  {
    profit: 10.15,
    name: "미국국채(50)",
    category: "해외(판매)",
    risk: 4,
    url: "www.naver.com",
  },
];
const { VITE_STOCK_IMG_URL, VITE_STOCK_IMG_URLB } = import.meta.env;
export default function ClubInfo() {
  const navigate = useNavigate();
  const clubService = useMemo(() => new clubAPI(), []);

  // API 호출해서 데이터 겟
  const service = useMemo(() => new clubAPI(), []);
  // 참여자
  const { data, error, isLoading } = useSWR<IClubCurrentPrice>(
    "club-price",
    () => service.currentPrice(+id)
  );

  const goToExternalSite = (url: string | undefined) => {
    if (url) window.location.href = "https://" + url;
  };
  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (error) {
    navigate("/error");
  }
  return (
    <div className="p-3">
      {/* <button onClick={() => openModal()}>로그인!</button> */}
      <div className="club-info flex justify-between">
        <div className="left flex gap-4 pt-2">
          <img
            className="w-12 h-12 rounded-xl"
            src={`${VITE_STOCK_IMG_URL}${"005930"}${VITE_STOCK_IMG_URLB}`}
            alt={`${"club"}-logo`}
          />
          <div className="">
            <p className="text-2xl font-semibold">삼성전자</p>
            <p className="text-slate-400">기업 사이트</p>
          </div>
        </div>
      </div>
      <div className="stock-container pt-4">
        <p className="text-xl">발행 주식</p>
        <div className="flex justify-between p-4">
          <div className="left flex gap-4 items-center">
            <img
              className="w-8 h-8 rounded-xl"
              src={`${VITE_STOCK_IMG_URL}${"005930"}${VITE_STOCK_IMG_URLB}`}
              alt={`${"club"}-logo`}
            />

            <p className="text-lg font-semibold">삼성전자</p>
          </div>
          <div className="right">
            <p className="text font-semibold leading-none">57,000</p>
            <p className="text-sm text-end leading-none">-3.0%</p>
          </div>
        </div>
      </div>
      <div className="club-portfolio pt-4">
        <p className="text-2xl font-semibold">
          클럽원들의 투자 중인 금액 <br />
          <span className="text-blue-600 font-semibold">1억원 이상</span>
          <p className="text-slate-400 font-light text-sm">오늘 14:40 기준</p>
        </p>
        <div className="porfolio flex flex-col gap-2 items-center">
          <div className="chart flex-1 mx-4">{/* <ChartPortfolio /> */}</div>
          <div className="stock-info flex-1 w-full p-4">
            <p className="text-xl font-semibold pb-4">
              클럽원들의 TOP3 투자종목
            </p>
            <Top3Item
              name={"삼성전자"}
              profit={40.1}
              color={"ff6384"}
              roi={1}
              key={1}
            />
            <Top3Item
              name={"넥슨"}
              profit={40.1}
              color={"ff6384"}
              roi={1}
              key={2}
            />
            <Top3Item
              name={"SK하이닉스"}
              profit={40.1}
              color={"ff6384"}
              key={3}
              roi={1}
            />
          </div>
        </div>
      </div>
      <div className="recommend">
        <p className="text-xl font-semibold pb-4 pl-2">신한의 추천 상품</p>
        <div className="recommend-container flex gap-2">
          {dummyRe.map((value) => {
            return (
              <RecommendItem
                profit={value.profit}
                name={value.name}
                category={value.category}
                risk={value.risk}
                url={value.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
