import authAPI from "@/apis/authAPI";
import { useEffect } from "react";
import { useAuthStore } from "@/store/store";
import axios from "axios";

export function useAuth() {
  //TODO: 상태관리(jotai)로 유저 정보 전역 저장해놓기
  const service = new authAPI();
  const { login, logout } = useAuthStore();

  // POST 로그인
  async function signIn(auth: { userId: string; password: string }) {
    try {
      const res = await service.signIn(auth);
      if (res.nickname && res.token) {
        console.log("login data:", res);
        login(res.nickname, res.token);
        return res.nickname;
      } else {
        throw Error("no nickname or token");
      }
    } catch (error) {
      //TODO: 에러 메세지 전달
      if (axios.isAxiosError(error)) {
        throw Error(error.response?.data.message);
      }
    }
  }

  //logout 유저정보 clear
  async function signOut() {
    logout();
  }

  //TODO: 마운트시 로그인여부체크해서 유저정보 세팅
  useEffect(() => {
    async function init() {}
    init();
  }, []);

  return {
    signIn,
    signOut,
  };
}
