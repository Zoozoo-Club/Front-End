import { useEffect, useState } from "react";
import { IDummyPost } from "@/apis/dummyAPI";
import { getAPI } from "@/hooks/useAPI";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import { useCommonModalStore } from "../store/store";

export const JsonHolderPosts = () => {
  const [count, setCount] = useState(0);
  const { openModal, closeModal } = useCommonModalStore();
  const [posts, setPosts] = useState<IDummyPost[]>();
  const { dummyAPI } = getAPI();

  async function openErrorModal() {
    openModal("Error", "error입니다", closeModal);
  }

  async function getPostList() {
    try {
      const res: IDummyPost[] = await dummyAPI.getPosts();
      setPosts(res);
      return res;
    } catch (err) {
      // 에러 노출
      console.log("Error to get posts", err);
      return [];
    }
  }

  async function getPost(id: number) {
    try {
      const res: IDummyPost = await dummyAPI.getPostById(id);
      setPosts([res]);
      return res;
    } catch (err) {
      // 에러 노출
      openErrorModal();
      console.log("Error to get posts!!!!!!", err);
      return [];
    }
  }

  useEffect(() => {
    getPostList();
  }, []);
  return (
    <div className="flex-1">
      <div className="flex flex-row items-center justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => getPost(1)}>1번 호출</button>
        <button onClick={() => getPostList()}>전부 호출</button>
      </div>
      <div className="post-container">
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id + ""}>
                <p>{post.title}</p>
                <p>{post.body}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
