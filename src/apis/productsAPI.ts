import { BaseApi } from './baseAPI';

export default class productsAPI extends BaseApi {
  async recommendedProductsByClubProfit() {
    const response = await this.fetcher.get(
      '/products/higher-than-profit/club'
    );
    return response.data;
  }

  async recommendedProductsByUserProfit() {
    const response = await this.fetcher.get(
      '/products/higher-than-profit/user'
    );
    return response.data;
  }
}
