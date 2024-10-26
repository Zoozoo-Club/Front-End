import { BaseApi } from './baseAPI';

export default class postsAPI extends BaseApi {
  async public() {
    const response = await this.fetcher.get('/posts/public');
    return response.data;
  }

  async myClub() {
    const response = await this.fetcher.get('/posts/my-club');
    return response.data;
  }
}
