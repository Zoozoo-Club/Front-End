import { IPost } from "./page";
import Avatar from "boring-avatars";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Props = {
  info: IPost;
};
export default function Post({ info }: Props) {
  const navigate = useNavigate();
  return (
    <div className="rounded-md border border-slate-100 p-4 my-2">
      <div className="top flex pb-4">
        <Avatar
          width={32}
          variant="beam"
          name={info.nickname}
          onClick={() => navigate(`/profile/${info.userId}`)}
        />
        <div
          className="text-start pl-2 "
          onClick={() => navigate(`/profile/${info.userId}`)}
        >
          <p className="leading-none font-semibold">
            {info.nickname}{" "}
            <span className="text-slate-500">- {info.clubName}</span>
          </p>
          <p className="text-sm leading-none text-slate-400 text-lg">
            {formatData(info.createdAt)}
          </p>
        </div>
      </div>
      <div className="content ">
        <p className="text-lg font-medium">{info.title}</p>
        <p className="clamp-3-lines">{info.content}</p>
      </div>
      <div className="bottom pt-1 flex items-center justify-end">
        <IoEyeOutline color={"#94a3b8"} />
        <span className="pl-1 text-sm text-slate-400">{info.pv}</span>
      </div>
    </div>
  );
}

function formatData(date: string) {
  const d = new Date(date);
  return d.getMonth() + 1 + "." + d.getDate();
}
