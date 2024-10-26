import { BaseApi } from "./baseAPI";
import { IAuthRes } from "./types";

export interface IAuth {
  userId: string;
  password: string;
}

export default class authAPI extends BaseApi {
  async signIn(auth: IAuth): Promise<IAuthRes> {
    const response = await this.fetcher.post("/auth/login", {
      ...auth,
    });
    return response.data;
  }
}
