import axios, { HttpStatusCode } from "axios";
const { VITE_BASE_URL } = import.meta.env;
//우리 서버랑 통신할 Api 세팅
export class BaseApi {
  fetcher;
  constructor() {
    this.fetcher = axios.create({
      baseURL: VITE_BASE_URL,
      headers: {
        "Content-type": "application/json",
      },
    });

    // 요청 인터셉터
    this.fetcher.interceptors.request.use(
      (config) => {
        // 헤더에 엑세스 토큰 담기
        const accessToken: string | null = localStorage.getItem("user-storage");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${
            JSON.parse(accessToken).state.token
          }`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

// 공통 에러 처리
export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === HttpStatusCode.BadRequest) {
      // throw new Error("로그인이 만료되었습니다.");
      throw new Error(error.response?.data.message);
    }

    if (
      error.response?.status &&
      error.response?.status < HttpStatusCode.InternalServerError
    ) {
      throw new Error("잘못된 요청입니다.");
    }

    console.error("Axios 에러:", error.response?.data.message || error.message);
    throw new Error("서버 오류가 발생하였습니다.");
  } else {
    console.error("알 수 없는 에러:", error);
    throw new Error("알 수 없는 에러가 발생하였습니다.");
  }
}
