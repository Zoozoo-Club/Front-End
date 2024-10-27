import { BaseApi } from './baseAPI';

export default class assetAPI extends BaseApi {
  async myAsset() {
    const response = await this.fetcher.get('/my-story/assets');
    return response.data;
  }

  //TODO: 아래 함수는 console에서 확인해봐야함 (희을이가 올려주면)
  /**
   *
   * @param userId
   * @returns "pchsAmtSmtlAmt": "10억원 이상"
   */
  async targetUserAsset(userId: number) {
    const response = await this.fetcher.get(`/my-story/assets/${userId}`);
    return response.data;
  }

  async myHoldings() {
    const response = await this.fetcher.get(`/my-story/holdings`);
    return response.data;
  }

  async targetUserHoldings(userId: number) {
    const response = await this.fetcher.get(`/my-story/holdings/${userId}`);
    return response.data;
  }
}
