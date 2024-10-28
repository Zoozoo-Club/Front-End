import HeaderNav from "@/components/HeaderNav";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import Ranking from "./Ranking";
import ClubInfo from "./ClubInfo";
import useSWR from "swr";
import clubAPI from "@/apis/clubAPI";
import { IClubInfoRes } from "@/apis/types";

export default function ClubRank() {
  const { id } = useParams(); // URL에서 id를 추출
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<"rank" | "info">("rank");
  const service = useMemo(() => new clubAPI(), []);
  if (!id) {
    navigate("/error");
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, error } = useSWR<IClubInfoRes | null>(
    "club-info",
    () => (id ? service.info(+id) : null)
  );
  if (error || !id) {
    return <div> no id</div>;
  }
  if (isLoading) {
    return <div> Loading.. </div>;
  }

  const onRank = () => {
    setSelectedMenu("rank");
  };
  const onInfo = () => {
    setSelectedMenu("info");
  };
  const handleBack = () => {
    // /rank -> / , /rank/detail?club= -> /rank
    navigate(-1);
  };
  const goToLounge = () => {
    navigate("/lounge");
  };

  return (
    <>
      <HeaderNav
        title={`${data?.companyInfo?.companyName}클럽 랭킹`}
        backBtn={handleBack}
      >
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
          {selectedMenu === "info" && data && <ClubInfo infos={data} id={id} />}
        </div>
      </div>
    </>
  );
}
