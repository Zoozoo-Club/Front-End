import ChartPortfolio from "@/components/ChartPortfolio";
import React from "react";
import StockItem from "./StockItem";

export default function Info() {
  return (
    <div className="p-3">
      {/* <button onClick={() => openModal()}>로그인!</button> */}
      <div className="club-info flex justify-between">
        <p className="text-2xl font-semibold">총 투자</p>
        <div className="right">
          <p className="text font-semibold leading-none">{"4,457,000"}원</p>
          <p className="text-sm text-end leading-none">{"-3.0"}%</p>
        </div>
      </div>
      <div className="club-portfolio pt-4">
        <div className="porfolio flex flex-col gap-2 items-center">
          <div className="chart flex-1 mx-4">
            <ChartPortfolio />
            <p className="text-slate-400 font-light text-sm text-end">
              보유 종목 기준일 {"2024.10.25"}
            </p>
          </div>
          <div className="stock-info flex-1 w-full p-4">
            <StockItem
              name={"삼성전자"}
              profit={"40.1"}
              color={"ff6384"}
              price={"39000"}
              key={1}
              percent={"40"}
              amount={"20"}
            />
            <StockItem
              name={"넥슨"}
              profit={"21.1"}
              color={"36a2eb"}
              price={"39000"}
              percent={"40"}
              amount={"20"}
              key={2}
            />
            <StockItem
              name={"SK하이닉스"}
              profit={"10.9"}
              color={"ffce56"}
              percent={"20"}
              amount={"10"}
              key={3}
              price={"39000"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
