import ChartPortfolio from "@/components/ChartPortfolio";
import StockItem from "./StockItem";
import assetAPI from "@/apis/assetAPI";
import useSWR from "swr";
import { IOtherAssetsRes, ITargetAssetRes } from "@/apis/types";
// import { useNavigate } from "react-router-dom";
import { formatNumber } from "@/lib/nums";
import Loading from "@/components/Loading";
type Props = {
  id: string;
};
const colors = ["ff6384", "36a2eb", "ffce56", "4bc0c0", "9966ff", "ff9f40"];
export default function Info({ id }: Props) {
  // const navigate = useNavigate();
  const service = new assetAPI();
  const { data, isLoading, error } = useSWR<ITargetAssetRes>(
    "other-asset",
    () => service.targetUserAsset(+id)
  );
  const {
    data: holdings,
    isLoading: isLoading2,
    error: error2,
  } = useSWR<IOtherAssetsRes>("other-holdings", () =>
    service.targetUserHoldings(+id)
  );

  if (isLoading || isLoading2) {
    return <Loading size="md" text="유저 정보를 불러오는 중입니다" />;
  }
  if (error || error2) {
    // navigate("/error");
    return <div>Error</div>;
  }

  const investmentChange = holdings && holdings && holdings.roi;
  const ratio =
    holdings &&
    holdings.stocksInfos.length > 0 &&
    holdings.stocksInfos.map((v) => +v.holdingRatio);
  const holdingNames =
    holdings &&
    holdings.stocksInfos.length > 0 &&
    holdings.stocksInfos.map((v) => v.stockName);

  return (
    <div className="p-3">
      {/* <button onClick={() => openModal()}>로그인!</button> */}
      <div className="club-info flex justify-between">
        <p className="text-2xl font-semibold p-4 ">총 투자</p>
        <div className="right text-right p-5">
          {data && (
            <p className="text-lg font-semibold leading-none">
              {data.pchsAmtSmtlAmt}
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
          <div className="stock-info flex-1 w-full p-4 mb-12">
            {holdings &&
              holdings.stocksInfos.map((v, i) => {
                return (
                  <StockItem
                    name={v.stockName}
                    profit={"" + v.earningRate}
                    color={colors[i]}
                    price={""}
                    key={i}
                    percent={formatNumber(+v.holdingRatio, 2)}
                    amount={"" + v.quantity}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
