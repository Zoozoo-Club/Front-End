import ChartPortfolio from "@/components/ChartPortfolio";
import { useLoginModalStore } from "@/store/store";
import ArrowRight from "@/assets/icon-arrow-right.svg?react";
import React from "react";
import Top3Item from "./Top3Item";
const { VITE_STOCK_IMG_URL, VITE_STOCK_IMG_URLB } = import.meta.env;
export default function ClubInfo() {
  const { openModal } = useLoginModalStore();
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
          <div className="chart flex-1 mx-4">
            <ChartPortfolio />
          </div>
          <div className="stock-info flex-1 w-full p-4">
            <p className="text-xl font-semibold pb-4">
              클럽원들의 TOP3 투자종목
            </p>
            <Top3Item
              name={"삼성전자"}
              profit={"40.1"}
              color={"ff6384"}
              price={"39000"}
              key={1}
            />
            <Top3Item
              name={"넥슨"}
              profit={"21.1"}
              color={"ff6384"}
              price={"39000"}
              key={2}
            />
            <Top3Item
              name={"SK하이닉스"}
              profit={"10.9"}
              color={"ff6384"}
              key={3}
              price={"39000"}
            />
          </div>
        </div>
      </div>
      <div className="recommand p-4">
        <p className="text-xl font-semibold pb-4">신한의 추천 상품</p>
      </div>
    </div>
  );
}
