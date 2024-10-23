import axios from "axios";
const { VITE_BASE_URL } = import.meta.env;

export class BaseApi {
  fetcher;
  constructor(sessionKey = "") {
    this.fetcher = axios.create({
      baseURL: VITE_BASE_URL,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionKey}`, //sessionKey가 있을때 사용. 없으면 제거
      },
    });
  }
}
