import ChartPortfolio from "@/components/ChartPortfolio";
import StockItem from "./StockItem";
import assetAPI from "@/apis/assetAPI";
import useSWR from "swr";
import { IAssetInfoRes } from "@/apis/types";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "@/lib/nums";
import Loading from "@/components/Loading";
const colors = ["ff6384", "36a2eb", "ffce56", "4bc0c0", "9966ff", "ff9f40"];
export default function Info() {
  const navigate = useNavigate();
  const service = new assetAPI();
  const { data, isLoading, error } = useSWR<IAssetInfoRes>("my-asset", () =>
    service.myAsset()
  );

  if (isLoading) {
    return <Loading size="md" text="데이터를 불러오는 중입니다" />;
  }
  if (error) {
    navigate("/error");
  }
  const total =
    data &&
    data.output2 &&
    data.output2?.length > 0 &&
    +data?.output2[0].evlu_pfls_smtl_amt + +data?.output2[0].pchs_amt_smtl_amt;
  const investmentChange =
    data && data.output2 && data.output2?.length > 0 && data?.output2[0].roi;
  const ratio =
    data &&
    data.output1 &&
    data.output1.length > 0 &&
    data.output1.map((v) => +v.holdingRatio);
  const holdingNames =
    data &&
    data.output1 &&
    data.output1.length > 0 &&
    data.output1.map((v) => v.prdt_name);

  return (
    <div className="p-3">
      {/* <button onClick={() => openModal()}>로그인!</button> */}
      <div className="club-info flex justify-between">
        <p className="text-2xl font-semibold p-4 ">총 투자</p>
        <div className="right text-right p-5">
          {total && (
            <p className="text-lg font-semibold leading-none">
              {formatNumber(total)}원
            </p>
          )}
          {investmentChange && (
            <p
              className={`text-sm text-end leading-none ${
                investmentChange < 0 ? "text-blue-500" : "text-red-500"
              }`}
            >
              <span className={` ${investmentChange < 0 ? "hidden" : ""}`}>
                +
              </span>
              {formatNumber(investmentChange, 2)}%
            </p>
          )}
        </div>
      </div>
      <div className="club-portfolio pt-4">
        <div className="porfolio flex flex-col gap-2 items-center">
          {ratio && holdingNames && (
            <div className="chart flex-1 mx-4">
              <ChartPortfolio
                ratios={ratio}
                labels={holdingNames}
                isGita={false}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end w-full mt-2 p-8">
          <p className="text-slate-400 font-light text-sm">
            보유 종목 기준일 {"2024.10.28"}
          </p>
        </div>
        <div className="porfolio flex flex-col gap-2 items-center">
          <div className="stock-info flex-1 w-full p-4">
            {data?.output1 &&
              data.output1.map((v, i) => {
                return (
                  <StockItem
                    name={v.prdt_name}
                    profit={"" + v.evlu_pfls_rt}
                    color={colors[i]}
                    price={v.pchs_avg_pric.split(".")[0]}
                    key={i}
                    percent={formatNumber(+v.holdingRatio, 2)}
                    amount={"" + v.hldg_qty}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
