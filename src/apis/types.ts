export interface IAuthRes {
  nickname?: string | null;
  token?: string | null;
}

export interface IProductRes {
  profit?: number | null;
  name?: string | null;
  category?: string | null;
  risk?: number | null;
  url?: string | null;
}

export interface IFollowingRes {
  userId?: number | null;
  nickname?: string | null;
  clubName?: string | null;
}

export interface IFollowerRes {
  userId?: number | null;
  nickname?: string | null;
  clubName?: string | null;
}

export interface IPostRes {
  clubId?: number | null;
  clubName?: string | null;
  content?: string | null;
  createdAt?: Date | null;
  id?: number | null;
  nickname?: string | null;
  pv?: number | null;
  title?: string | null;
  updatedAt?: Date | null;
  userId?: number | null;
}

export interface IStockHoldings {
  stockCode?: string | null;
  stockName?: string | null;
  holdingRatio?: number | null;
  roi?: number | null;
  holdingMembers?: number | null;
}
export interface IClubPortfolio {
  totalMembers?: number | null;
  totalInvestmentAmount?: number | null;
  stockHoldings?: IStockHoldings | null;
}
export interface ICompanyInfo {
  companyId?: number;
  companyName?: string;
  logoId?: string;
  websiteUrl?: string;
}
export interface IClubInfoRes {
  companyInfo?: ICompanyInfo | null;
  clubPortfolio?: IClubPortfolio | null;
}

export interface IClubCurrentPrice {
  stockCode?: string | null;
  currentPrice?: number | null;
}

export interface IClubZooZooInfoRes {
  userId?: number | null;
  nickname?: string | null;
  roi?: number | null;
}

export interface IAllClubRankingInfoRes {
  clubId?: number | null;
  clubName?: string | null;
  profitValue?: number | null;
  roi?: number | null;
  totalAmount?: number | null;
  userCount?: number | null;
}

export interface IAssetInfoRes {
  output1?: Array<{
    map?: {
      evluAmt?: string | null; // 평가금액
      pchsAvgPric?: string | null; // 매입평균가
      stockName?: string | null; // 종목명
      evluPflsAmt?: string | null; // 평가손익금액
      stockCode?: string | null; // 종목코드
      currentPrice?: string | null; // 현재가
      evluPflsRt?: string | null; // 평가손익률
      quantity?: string | null; // 수량
    } | null;
    pdno?: string | null; // 종목코드
    prdt_name?: string | null; // 종목명
    hldg_qty?: string | null; // 보유수량
    evlu_amt?: string | null; // 평가금액
    evlu_pfls_amt?: string | null; // 평가손익금액
    evlu_pfls_rt?: string | null; // 평가손익률
    pchs_avg_pric?: string | null; // 매입평균가
    prpr?: string | null; // 현재가
  }>;
  output2?: Array<{
    map?: {
      pchsAmtSmtlAmt?: string | null; // 매입금액 합계
      evluPflsSmtlAmt?: string | null; // 평가손익 합계
    } | null;
    evlu_pfls_smtl_amt?: string | null; // 평가손익 합계
    pchs_amt_smtl_amt?: string | null; // 매입금액 합계
  }>;
}

export interface ITargetAssetRes {
  pchsAmtSmtlAmt?: string | null;
}

export interface IHoldingsRes {
  stockCode?: string | null;
  stockName?: string | null;
  quantity?: number | null;
  averagePrice?: number | null;
  currentPrice?: number | null;
  earningRate?: number | null;
}
