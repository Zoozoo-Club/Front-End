import { BaseApi } from "./baseAPI";

export interface IDummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}
export interface IDummyPostReq {
  id: number;
  title: string;
  body: string;
}
export default class dummyAPI extends BaseApi {
  async getPostById(id: number): Promise<IDummyPost> {
    const resp = await this.fetcher.get<IDummyPost>(`/posts/${id}`);
    return resp.data;
  }

  async getPosts(): Promise<IDummyPost[]> {
    const resp = await this.fetcher.get<IDummyPost[]>("/posts");
    return resp.data;
  }

  async setPosts({ id, title, body }: IDummyPostReq): Promise<IDummyPost> {
    const resp = await this.fetcher.post<IDummyPost>("/posts", {
      id,
      title,
      body,
    });
    return resp.data;
  }
}
