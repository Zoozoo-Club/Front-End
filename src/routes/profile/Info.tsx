import ChartPortfolio from "@/components/ChartPortfolio";
import React from "react";
import StockItem from "./StockItem";
import assetAPI from "@/apis/assetAPI";
import useSWR from "swr";
import { IAssetInfoRes } from "@/apis/types";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const investmentChange = "-3.0";
  const navigate = useNavigate();
  const service = new assetAPI();
  const { data, isLoading, error } = useSWR<IAssetInfoRes>("my-asset", () =>
    service.myAsset()
  );
  const {
    data: holdings,
    isLoading: isLoading2,
    error: error2,
  } = useSWR("my-holdings", () => service.myHoldings());

  if (isLoading || isLoading2) {
    return <p>Loading..</p>;
  }
  if (error || error2) {
    navigate("/error");
  }
  return (
    <div className="p-3">
      {/* <button onClick={() => openModal()}>로그인!</button> */}
      <div className="club-info flex justify-between">
        <p className="text-2xl font-semibold p-4 ">총 투자</p>
        <div className="right text-right p-5">
          <p className="text-lg font-semibold leading-none">{"4,457,000"}원</p>
          <p
            className={`text-sm text-end leading-none ${
              parseFloat(investmentChange) < 0
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {investmentChange}%
          </p>
        </div>
      </div>
      <div className="club-portfolio pt-4">
        <div className="porfolio flex flex-col gap-2 items-center">
          <div className="chart flex-1 mx-4">
            <ChartPortfolio
              ratios={[55.4, 44.6]}
              labels={["신한지주", "HLB"]}
            />
          </div>
        </div>
        <div className="flex justify-end w-full mt-2 p-8">
          <p className="text-slate-400 font-light text-sm">
            보유 종목 기준일 {"2024.10.25"}
          </p>
        </div>
        <div className="porfolio flex flex-col gap-2 items-center">
          <div className="stock-info flex-1 w-full p-4">
            <StockItem
              name={"신한지주"}
              profit={"4.21"}
              color={"ff6384"}
              price={"58000"}
              key={1}
              percent={"40"}
              amount={"100"}
            />
            <StockItem
              name={"HLB"}
              profit={"-1.21"}
              color={"36a2eb"}
              price={"65300"}
              percent={"40"}
              amount={"66"}
              key={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
