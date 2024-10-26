import { BaseApi } from './baseAPI';

export default class clubAPI extends BaseApi {
  async info(clubId: number) {
    const response = await this.fetcher.get(`/clubs/${clubId}/info`);
    return response.data;
  }

  async currentPrice(clubId: number) {
    const response = await this.fetcher.get(`/clubs/${clubId}/current`);
    return response.data;
  }
}
