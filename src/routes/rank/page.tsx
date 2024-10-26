import HeaderNav from "@/components/HeaderNav";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";
import Ranking from "./Ranking";
import ClubInfo from "./ClubInfo";

export default function Rank() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<"rank" | "info">("rank");
  const onRank = () => {
    setSelectedMenu("rank");
  };
  const onInfo = () => {
    setSelectedMenu("info");
  };
  const handleBack = () => {
    // /rank -> / , /rank/detail?club= -> /rank
    navigate("/");
  };
  const goToLounge = () => {
    navigate("/lounge");
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
