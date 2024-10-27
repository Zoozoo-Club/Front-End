import HeaderNav from "@/components/HeaderNav";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import Ranking from "./Ranking";
import ClubInfo from "./ClubInfo";
import rankingAPI from "@/apis/rankingAPI";
import useSWR from "swr";

export default function ClubRank() {
  const { id } = useParams(); // URL에서 id를 추출
  const navigate = useNavigate();
  const [data, setData] = useState(null);
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
      <HeaderNav title={`${id}클럽 랭킹`} backBtn={handleBack}>
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
          {selectedMenu === "rank" && <Ranking id={id} />}
          {selectedMenu === "info" && <ClubInfo id={id} />}
        </div>
      </div>
    </>
  );
}
