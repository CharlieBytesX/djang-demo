import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function SimpleFormContainer(props: Props) {
  return (
    <div className="h-screen bg-slate-100 flex flex-col items-center justify-center ">
      <div className="bg-white rounded-lg px-4 py-3 flex flex-col">
        {props.children}
      </div>
    </div>
  );
}
