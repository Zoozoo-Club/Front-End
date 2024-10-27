import React from 'react';
import './style.css';
type Props = {
  selectedMenu: 'all' | 'mine';
  onRank: () => void;
  onInfo: () => void;
};
function Menu({ selectedMenu, onRank, onInfo }: Props) {
  return (
    <div className="w-full h-12 border-solid border-b-2  border-slate-200 flex relative">
      <div
        onClick={onRank}
        className={`${
          selectedMenu === 'all' ? '' : 'text-slate-300'
        } w-1/2 flex justify-center items-center `}
      >
        <p className="text-center">모두의 라운지</p>
      </div>
      <div
        onClick={onInfo}
        className={`${
          selectedMenu === 'mine' ? '' : 'text-slate-300'
        } w-1/2 flex justify-center items-center `}
      >
        <p className="text-center">내 클럽 라운지</p>
      </div>
      <div
        className={`w-1/2 absolute bg-black h-[2px] bottom-0 line ${
          selectedMenu === 'mine' ? 'move-right' : ''
        }`}
      ></div>
    </div>
  );
}

export default Menu;
