import { BaseApi } from "./baseAPI";

export default class myProfileAPI extends BaseApi {
  async myAsset() {
    const response = await this.fetcher.get("/my-story/assets/1");
    return response.data;
  }
}
