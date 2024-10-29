import IconBackArrow from "@/assets/icon-arrow-left.svg?react";
type Props = {
  title: string;
  backBtn: () => void;
  children?: React.ReactNode;
};
export default function HeaderNav({ title, backBtn, children }: Props) {
  return (
    <div className="header-nav flex justify-between items-center h-16">
      <div className="left flex items-center pl-2 h-full" onClick={backBtn}>
        <IconBackArrow width={32} />
        <p className="text-lg whitespace-nowrap truncate">{title}</p>
      </div>
      <div className="right pr-2 h-full flex items-center">{children}</div>
    </div>
  );
}
