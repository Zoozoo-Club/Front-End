import React from "react";
import { IPost } from "./page";
import Avatar from "boring-avatars";
/**
 * 
 * export interface IPost {
  userName: string;
  title: string;
  content: string;
  pv: number;
  userId: number;
  clubId: number;
  createdAt: string;
  updatedAt: string;
}
 */
type Props = {
  info: IPost;
};
export default function Post({ info }: Props) {
  return (
    <div className="rounded-md border border-slate-100 p-4 my-2">
      <div className="top flex pb-4">
        <Avatar width={32} variant="beam" name={info.userName} />
        <div className="text-start pl-2 ">
          <p className="leading-none">{info.userName}</p>
          <p className="text-sm leading-none text-slate-400 text-lg">
            {formatData(info.createdAt)}
          </p>
        </div>
      </div>
      <div className="content ">
        <p className="text-lg font-medium">{info.title}</p>
        <p className="">{info.content}</p>
      </div>
      <div className="bottom pt-1"></div>
    </div>
  );
}

function formatData(date: string) {
  const d = new Date(date);
  return d.getMonth() + 1 + "." + d.getDate();
}
