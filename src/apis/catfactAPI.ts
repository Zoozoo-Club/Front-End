import axios from "axios";
const { VITE_CAT_URL } = import.meta.env;

export interface ICatfactRes {
  current_page: number;
  data: ICatfact[];
  last_page: number;
  next_page_url: string;
  from: number; //시작idx
  to: number; //끝idx
  per_page: number; //페이지당 갯수
  total: number; //전체 idx
}

export interface ICatfact {
  fact: string;
  length: number;
}

export class catfactAPI {
  fetcher;
  constructor(sessionKey = "") {
    this.fetcher = axios.create({
      baseURL: VITE_CAT_URL,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionKey}`, //sessionKey가 있을때 사용. 없으면 제거
      },
    });
  }

  async getcatfacts(page: number, limit: number): Promise<ICatfactRes> {
    const res = await this.fetcher.get<ICatfactRes>(
      `/facts?page=${page}&limit=${limit}`
    );
    return res.data;
  }
}
