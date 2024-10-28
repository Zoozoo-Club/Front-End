import ChartPortfolio from "@/components/ChartPortfolio";
import { useMemo } from "react";
import Top3Item from "../Top3Item";
import { IClubCurrentPrice, IClubInfoRes } from "@/apis/types";
import clubAPI from "@/apis/clubAPI";
import useSWR from "swr";
import { formatNumber, truncateToEok } from "@/lib/nums";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
const { VITE_STOCK_IMG_URL, VITE_STOCK_IMG_URLB } = import.meta.env;

type Props = {
  infos: IClubInfoRes;
  id: string;
};
export default function ClubInfo({ infos, id }: Props) {
  const navigate = useNavigate();

  const goToExternalSite = (url: string | undefined) => {
    if (url) window.location.href = "https://" + url;
  };
  // API 호출해서 데이터 겟
  const service = useMemo(() => new clubAPI(), []);
  // 참여자
  const { data, error, isLoading } = useSWR<IClubCurrentPrice>(
    "club-price",
    () => service.currentPrice(+id)
  );
  if (isLoading) {
    return <Loading size="md" text="클럽 정보를 불러오는 중입니다" />;
  }
  if (error) {
    navigate("/error");
  }
  return (
    <div className="p-3">
      <div className="club-info flex justify-between">
        <div className="left flex gap-4 pt-2">
          <img
            className="w-12 h-12 rounded-xl"
            src={`${VITE_STOCK_IMG_URL}${infos.companyInfo?.logoId}${VITE_STOCK_IMG_URLB}`}
            alt={`${"club"}-logo`}
          />
          <div className="">
            <p className="text-2xl font-semibold">
              {infos.companyInfo?.companyName}
            </p>
            {infos.companyInfo?.websiteUrl && (
              <p
                className="text-slate-400  underline"
                onClick={() => goToExternalSite(infos.companyInfo?.websiteUrl)}
              >
                기업 사이트
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="stock-container pt-4">
        <p className="text-xl font-bold">대표 주식</p>
        <div className="flex justify-between p-4">
          <div className="left flex gap-4 items-center">
            <img
              className="w-8 h-8 rounded-xl"
              src={`${VITE_STOCK_IMG_URL}${infos.companyInfo.logoId}${VITE_STOCK_IMG_URLB}`}
              alt={`${"club"}-logo`}
            />
            <p className="text-lg font-semibold">{data?.name}</p>
          </div>
          <div className="right">
            {data && (
              <p className="text font-semibold leading-none">
                {formatNumber(data?.currentPrice)}원
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="club-portfolio pt-4">
        <p className="text-2xl font-semibold">
          클럽원들의 투자 중인 금액 <br />
          {infos.clubPortfolio?.totalInvestmentAmount && (
            <span className="text-blue-600 font-semibold">
              {truncateToEok(infos.clubPortfolio.totalInvestmentAmount)} 이상
            </span>
          )}
          <p className="text-slate-400 font-light text-sm">어제 기준</p>
        </p>
        <div className="porfolio flex flex-col gap-2 items-center">
          <div className="chart flex-1 mx-4">
            <ChartPortfolio
              ratios={infos.clubPortfolio.stockHoldings
                .slice(0, 5)
                .map((v) => v.holdingRatio)}
              labels={infos.clubPortfolio.stockHoldings
                .slice(0, 5)
                .map((v) => v.stockName)}
              isGita={true}
            />
          </div>
          <div className="stock-info flex-1 w-full p-4">
            <p className="text-xl font-semibold pb-4">
              클럽원들의 TOP3 투자종목
            </p>
            <Top3Item
              name={infos.clubPortfolio.stockHoldings[0].stockName}
              profit={infos.clubPortfolio.stockHoldings[0].holdingRatio}
              color={"ff6384"}
              roi={infos.clubPortfolio.stockHoldings[0].roi}
              key={1}
            />
            <Top3Item
              name={infos.clubPortfolio.stockHoldings[1].stockName}
              profit={infos.clubPortfolio.stockHoldings[1].holdingRatio}
              color={"36a2eb"}
              roi={infos.clubPortfolio.stockHoldings[1].roi}
              key={2}
            />
            <Top3Item
              name={infos.clubPortfolio.stockHoldings[2].stockName}
              profit={infos.clubPortfolio.stockHoldings[2].holdingRatio}
              color={"ffce56"}
              key={3}
              roi={infos.clubPortfolio.stockHoldings[2].roi}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
