import ErrorDialog from "@/components/shared/ErrorDialog";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function LoginPage() {
  // const { error } = useQuery({
  //   queryKey: ["signup"],
  //   queryFn: () =>
  //     fetch("/api/sign_up").then((res) => {
  //       if (res.status != 200) {
  //         throw "Error";
  //       }
  //       return res;
  //     }),
  // });

  return (
    <div className="h-screen bg-slate-100 flex flex-col justify-center items-center">
      <div className="flex w-80 flex-col justify-center  bg-white px-4 rounded-lg py-5 border">
        <div className="w-44 self-center">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <h1 className="self-center font-semibold text-xl mt-2">Login</h1>
        <Label className="mt-2">Email:</Label>
        <Input type="email" className="mt-1"></Input>
        <Label className=" mt-2">Password:</Label>
        <Input type="password" className="mt-1"></Input>
        <Button className="mt-2">Login</Button>
        {/* {!error && <ErrorDialog />} */}
        <p className=" mt-3 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to="/sign_up"
            className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
