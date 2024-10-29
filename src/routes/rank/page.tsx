import HeaderNav from "@/components/HeaderNav";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import Ranking from "./Ranking";
import ClubInfo from "./ClubInfo";
import {
  useAuthStore,
  useLoginModalStore,
  useNextUrlStore,
} from "@/store/store";

export default function Rank() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const openLoginModal = useLoginModalStore((state) => state.openModal);
  const setNextUrl = useNextUrlStore((state) => state.setNextUrl);
  const { nextUrl, tab } = useNextUrlStore();
  const [selectedMenu, setSelectedMenu] = useState<"rank" | "info">("rank");
  useEffect(() => {
    if (token && nextUrl === "/rank" && tab === "info") {
      setSelectedMenu("info");
      setNextUrl(null); // nextUrl과 tab 초기화
    }
  }, [token, nextUrl, tab]);
  const onRank = () => {
    setSelectedMenu("rank");
  };
  const onInfo = () => {
    if (!token) {
      setNextUrl("/rank", "info");
      openLoginModal();
    } else {
      setSelectedMenu("info");
    }
  };
  const handleBack = () => {
    // /rank -> / , /rank/detail?club= -> /rank
    navigate(-1);
  };
  const goToLounge = () => {
    if (!token) {
      setNextUrl("/lounge");
      openLoginModal();
      return; // 로그인 모달을 열고 함수 종료
    }
    navigate("/lounge");
  };
  return (
    <>
      <HeaderNav title={"주주클럽 랭킹"} backBtn={handleBack}>
        <div
          className="btn text-sm bg-[#CBD9FF] p-1 px-3 rounded-full whitespace-nowrap truncate mr-1"
          onClick={goToLounge}
        >
          라운지 가기
        </div>
      </HeaderNav>
      <div className="container flex-grow flex flex-col">
        <Menu selectedMenu={selectedMenu} onRank={onRank} onInfo={onInfo} />
        <div className="flex-grow h-96 pb-12 overflow-scroll scroll">
          {selectedMenu === "rank" && <Ranking />}
          {selectedMenu === "info" && <ClubInfo />}
        </div>
      </div>
    </>
  );
}
