import HeaderNav from "@/components/HeaderNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Board from "./Board";
import Menu from "./Menu";
export interface IPost {
  userName: string;
  title: string;
  content: string;
  pv: number;
  userId: number;
  clubId: number;
  clubName: string;
  createdAt: string;
  updatedAt: string;
}
const dummyData: IPost[] = [
  {
    userName: "yeaha",
    title: "안녕하세요 제목1",
    content: "내용내용",
    pv: 1,
    userId: 1,
    clubId: 1,
    clubName: "삼성전자",
    createdAt: "2024-10-26",
    updatedAt: "",
  },
  {
    userName: "soya",
    title: "안녕하세요 제목2",
    content: "내용내용",
    pv: 1,
    userId: 1,
    clubId: 1,
    clubName: "삼성전자",
    createdAt: "2024-10-25",
    updatedAt: "",
  },
  {
    userName: "sooya",
    title: "안녕하세요 제목3",
    content: "내용내용",
    pv: 1,
    userId: 1,
    clubId: 1,
    clubName: "삼성전자",
    createdAt: "2024-10-21",
    updatedAt: "",
  },
];

export default function Lounge() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<"all" | "mine">("all");
  const [data, setData] = useState<IPost[]>([]); //showing 게시물
  const onAll = () => {
    setSelectedMenu("all");
  };
  const onMine = () => {
    setSelectedMenu("mine");
  };
  const handleBack = () => {
    // /rank -> / , /rank/detail?club= -> /rank
    navigate("/");
  };
  const goToRank = () => {
    navigate("/rank");
  };
  useEffect(() => {
    setData(dummyData);
  }, []);
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
