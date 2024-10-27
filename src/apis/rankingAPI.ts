import { BaseApi } from "./baseAPI";
const type = {
  user: "user",
  roi: "roi",
  amount: "amount",
};
export default class rankingAPI extends BaseApi {
  async allClubRankingByUserByAmount() {
    const response = await this.fetcher.get("/rankings", {
      params: { type: type?.amount || "" },
    });
    return response.data;
  }
  async allClubRankingByUserByROI() {
    const response = await this.fetcher.get("/rankings", {
      params: { type: type?.roi || "" },
    });
    return response.data;
  }
  /**
   * 참가자순
   * @param type
   * @returns
   */
  async allClubRankingByUser() {
    const response = await this.fetcher.get("/rankings", {
      params: { type: type?.user || "" },
    });
    return response.data;
  }
  async targetClubRanking(targetClubId: number) {
    const response = await this.fetcher.get(`/rankings/${targetClubId}`);
    return response.data;
  }

  async getMyClub() {
    const response = await this.fetcher.get(`/clubs/my-club`);
    return response.data;
  }
}
