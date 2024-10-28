import { BaseApi } from "./baseAPI";

export default class followsAPI extends BaseApi {
  async targetUserInfo(id: string) {
    const response = await this.fetcher.get("/users/" + id);
    return response.data;
  }

  async myFollowers() {
    const response = await this.fetcher.get("/follows/followers");
    return response.data;
  }

  async myFollowing() {
    const response = await this.fetcher.get("/follows/following");
    return response.data;
  }

  async follow(targetUserId: number) {
    const response = await this.fetcher.post(`/follows/${targetUserId}`);
    return response.data;
  }

  /**
   * 준우 확인
   */
  async unFollow(targetUserId: number) {
    const response = await this.fetcher.delete(
      `/follows/unfollows/${targetUserId}`
    );
    return response.data;
  }

  async targetUserFollowers(targetUserId: number) {
    const response = await this.fetcher.get(
      `/follows/${targetUserId}/followers`
    );
    return response.data;
  }

  async targetUserFollowing(targetUserId: number) {
    const response = await this.fetcher.get(
      `/follows/${targetUserId}/following`
    );
    return response.data;
  }

  async targetUserFollowingStatus(targetUserId: number) {
    const response = await this.fetcher.get(`/follows/${targetUserId}/status`);
    return response.data;
  }
}
