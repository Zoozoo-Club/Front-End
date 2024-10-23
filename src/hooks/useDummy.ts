import { IDummyPost, IDummyPostReq } from "../apis/dummyAPI";
import { useEffect, useState } from "react";
import { getAPI } from "./useAPI";
export function useAuth() {
  const [posts, setPosts] = useState<IDummyPost[]>([]);
  const { dummyAPI } = getAPI();
  // 상태관리로 할 애들은 커스텀훅으로 빼고, 그렇지 않은애들은 그냥 컴포넌트단에서 부르고 에러처리하면될것 같다.
  // 근데 우선 커스텀훅만 구현해둠.
  async function getPostList() {
    try {
      const res: IDummyPost[] = await dummyAPI.getPosts();
      console.log("res: ", res);
      setPosts(res);
      return res;
    } catch (err) {
      // 에러 노출
      console.log("Error to get posts", err);
      return [];
    }
  }

  // POST signup
  async function addPost({ id, title, body }: IDummyPostReq): Promise<boolean> {
    try {
      const res: IDummyPost = await dummyAPI.setPosts({
        id,
        title,
        body,
      });

      if (res) {
        return true;
      } else {
        throw Error;
      }
    } catch (err) {
      //복구
      console.log("Error to signup", err);
      //실패 케이스에 따라 회원가입 실패 노출(중복 이메일, 잘못된이메일형식, 비번 글자수)
      return false;
    }
  }

  //마운트시 로그인여부체크(쿠키)해서 유저정보 세팅
  useEffect(() => {
    async function init() {
      console.log("init");
      await getPostList();
    }
    init();
  }, []);
  return { posts, addPost };
}
