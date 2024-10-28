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
  stockName: string;
  holdingRatio: number;
  roi: number;
  holdingMembers?: number | null;
}
export interface IClubPortfolio {
  totalMembers: number;
  totalInvestmentAmount: number;
  stockHoldings: IStockHoldings[];
}
export interface ICompanyInfo {
  companyId?: number;
  companyName?: string;
  logoId?: string;
  websiteUrl?: string;
}
export interface IClubInfoRes {
  companyInfo: ICompanyInfo;
  clubPortfolio: IClubPortfolio;
}

export interface IClubCurrentPrice {
  stockCode: string;
  currentPrice: number;
  name: string;
}

export interface IClubZooZooInfoRes {
  userId: number;
  nickname: string;
  roi: number;
}

export interface MyClub {
  clubId: number;
  clubName: string;
}

export interface IAllClubRankingInfoRes {
  clubId: number;
  clubName: string;
  profitValue: number; //수익 금액
  roi: number; //퍼센트
  totalAmount: number; //총액
  userCount: number; //학생수
  code?: string | null;
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
    prdt_name: string; // 종목명
    hldg_qty: string; // 보유수량
    holdingRatio: string;
    evlu_amt?: string | null; // 평가금액
    evlu_pfls_amt?: string | null; // 평가손익금액
    evlu_pfls_rt?: string | null; // 평가손익률
    pchs_avg_pric: string; // 매입평균가
    prpr: string; // 현재가
  }>;
  output2?: Array<{
    map?: {
      pchsAmtSmtlAmt: string; // 매입금액 합계
      evluPflsSmtlAmt: string; // 평가손익 합계
    } | null;
    evlu_pfls_smtl_amt: string; // 평가손익 합계
    pchs_amt_smtl_amt: string; // 매입금액 합계
    roi: number;
  }>;
}

export interface ITargetAssetRes {
  pchsAmtSmtlAmt?: string | null;
}

export interface IHoldingsRes {
  stockCode: string;
  stockName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  earningRate: number;
}

export interface IMyClubRes {
  clubId: number;
  clubName: string;
}
