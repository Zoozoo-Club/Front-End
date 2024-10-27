import React from 'react';
import { IPost } from './page';
import Avatar from 'boring-avatars';
import { IoEyeOutline } from 'react-icons/io5';

type Props = {
  info: IPost;
};
export default function Post({ info }: Props) {
  return (
    <div className="rounded-md border border-slate-100 p-4 my-2">
      <div className="top flex pb-4">
        <Avatar width={32} variant="beam" name={info.nickname} />
        <div className="text-start pl-2 ">
          <p className="leading-none">{info.nickname}</p>
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
        <IoEyeOutline color={'#94a3b8'} />
        <span className="pl-1 text-sm text-slate-400">{info.pv}</span>
      </div>
    </div>
  );
}

function formatData(date: string) {
  const d = new Date(date);
  return d.getMonth() + 1 + '.' + d.getDate();
}
