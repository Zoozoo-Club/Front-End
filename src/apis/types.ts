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
