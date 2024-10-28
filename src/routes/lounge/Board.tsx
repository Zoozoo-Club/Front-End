import SearchBar from "@/components/SearchBar";
import { IPost } from "./page";
import Post from "./Post";
type Props = {
  tab: string;
  data: IPost[];
};
export default function Board({ data }: Props) {
  return (
    <div>
      <div className="search px-2 pt-4">
        <SearchBar placeholder={"글 검색"} />
        {data &&
          data.map((item, idx) => {
            return <Post key={idx} info={item} />;
          })}
      </div>
    </div>
  );
}
