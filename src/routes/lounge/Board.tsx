import SearchBar from "@/components/SearchBar";
import React from "react";
import { IPost } from "./page";
import Post from "./Post";
type Props = {
  tab: string;
  data: IPost[];
};
export default function Board({ tab, data }: Props) {
  return (
    <div>
      {tab}
      <div className="search px-2">
        <SearchBar placeholder={"글 검색"} />
        {data &&
          data.map((item, idx) => {
            return <Post key={idx} info={item} />;
          })}
      </div>
    </div>
  );
}
