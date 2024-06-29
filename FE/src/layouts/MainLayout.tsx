import LoggedNavbar from "@/components/Navbar";
import { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
export default function MainLayout(props: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col px-8">
      <LoggedNavbar />
      <main className="bg-white  flex-1 mt-2  py-4 mb-4 flex rounded-sm flex-col px-10">
        {props.children}
      </main>
    </div>
  );
}
