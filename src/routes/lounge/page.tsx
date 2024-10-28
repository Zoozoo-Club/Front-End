import HeaderNav from "@/components/HeaderNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Board from "./Board";
import Menu from "./Menu";
import {
  useAuthStore,
  useLoginModalStore,
  useNextUrlStore,
} from "@/store/store";
import postsAPI from "@/apis/postsAPI";

export interface IPost {
  nickname: string;
  title: string;
  content: string;
  pv: number;
  userId: number;
  clubId: number;
  clubName: string;
  createdAt: string;
  updatedAt: string;
}

export default function Lounge() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<"all" | "mine">("all");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IPost[]>([]); //showing 게시물
  const [isLoading, setIsLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const openLoginModal = useLoginModalStore((state) => state.openModal);
  const { nextUrl, tab, setNextUrl } = useNextUrlStore();

  useEffect(() => {
    if (token && nextUrl === "/lounge" && tab === "mine") {
      setSelectedMenu("mine");
      setNextUrl(null); // nextUrl과 tab 초기화
    }
  }, [token, nextUrl, tab]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const posts = new postsAPI();
        const response =
          selectedMenu === "all" ? await posts.public() : await posts.myClub();
        setData(response);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("게시물을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMenu]);

  const onAll = () => {
    setSelectedMenu("all");
  };
  const onMine = () => {
    if (!token) {
      setNextUrl("/lounge", "mine");
      openLoginModal();
    } else {
      setSelectedMenu("mine");
    }
  };
  const handleBack = () => {
    // /rank -> / , /rank/detail?club= -> /rank
    navigate(-1);
  };
  const goToRank = () => {
    navigate("/rank");
  };

  return (
    <>
      <HeaderNav title={"주주클럽 라운지"} backBtn={handleBack}>
        <div
          className="btn text-sm bg-[#CBD9FF] p-1 px-3 rounded-full mr-1"
          onClick={goToRank}
        >
          랭킹 가기
        </div>
      </HeaderNav>
      <div className="container flex-grow flex flex-col">
        <Menu selectedMenu={selectedMenu} onRank={onAll} onInfo={onMine} />
        <div className="flex-grow h-96 pb-12 overflow-scroll">
          <Board tab={selectedMenu} data={data} />
        </div>
      </div>
    </>
  );
}
