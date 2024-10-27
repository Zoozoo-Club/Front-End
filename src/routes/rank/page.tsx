import HeaderNav from "@/components/HeaderNav";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";
import Ranking from "./Ranking";
import ClubInfo from "./ClubInfo";
import { useAuthCheck } from "@/hooks/useRequireAuth";
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
  const [selectedMenu, setSelectedMenu] = useState<"rank" | "info">("rank");

  const onRank = () => {
    setSelectedMenu("rank");
  };
  const onInfo = () => {
    if (!token) {
      setNextUrl("/rank"); // 현재 페이지에서 info 탭으로 돌아오도록
      openLoginModal();
      return;
    }
    setSelectedMenu("info");
  };
  const handleBack = () => {
    navigate("/");
  };
  const goToLounge = () => {
    if (!token) {
      setNextUrl("/lounge"); // 로그인 후 이동할 URL 저장
      openLoginModal(); // 로그인 모달 열기
      return;
    }
    navigate("/lounge"); // 이미 로그인된 경우 바로 이동
  };
  return (
    <>
      <HeaderNav title={"주주클럽 랭킹"} backBtn={handleBack}>
        <div
          className="btn text-sm bg-[#CBD9FF] p-1 px-3 rounded-full mr-1"
          onClick={goToLounge}
        >
          라운지 가기
        </div>
      </HeaderNav>
      <div className="container flex-grow flex flex-col">
        <Menu selectedMenu={selectedMenu} onRank={onRank} onInfo={onInfo} />
        <div className="flex-grow h-96 pb-12 overflow-scroll">
          {selectedMenu === "rank" && <Ranking />}
          {selectedMenu === "info" && <ClubInfo />}
        </div>
      </div>
    </>
  );
}
