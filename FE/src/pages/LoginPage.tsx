import ErrorDialog from "@/components/shared/ErrorDialog";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authManager } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginAction = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(
        "/api/sign_in",
        authManager.addAuthToRequest({
          method: "POST",
          body: data,
        }),
      );

      if (res.status == 200) {
        authManager.login();
        navigate("/my_posts");
      } else if (res.status == 403) {
        return { confirm_email: true, error_message: await res.json() };
      } else if (res.status == 401) {
        return { invalid_credentials: true, error_message: await res.json() };
      }

      throw new Error();
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formContent = new FormData(e.currentTarget);
    loginAction.mutate(formContent);
  };

  return (
    <>
      <div className="h-screen bg-slate-100 flex flex-col justify-center items-center">
        <div className="flex w-80 flex-col justify-center  bg-white px-4 rounded-lg py-5 border">
          <div className="w-44 self-center">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <h1 className="self-center font-semibold text-xl mt-2">Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <Label className="mt-2">Email:</Label>
            <Input
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              type="email"
              className="mt-1"
            ></Input>
            <Label className=" mt-2">Password:</Label>
            <Input
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              type="password"
              className="mt-1"
            ></Input>
            {loginAction.data?.error_message && (
              <p className="text-red-500 text-sm ml-1 mt-1 ">
                {loginAction.data?.error_message}
              </p>
            )}
            <Button className="mt-2 w-full">Login</Button>
          </form>

          {loginAction.data?.confirm_email && (
            <Link
              to={"/resend_confirmation_email"}
              className=" hover:opacity-70 mt-3 text-center text-sm text-gray-500 mb-[-0.75rem]  "
            >
              Resend email confirmation?
            </Link>
          )}
          <p className=" mt-3 text-center text-sm text-gray-500 ">
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

      {loginAction.isError && (
        <ErrorDialog
          open={true}
          message={
            loginAction.error?.message ||
            "Pls try again later or contact support"
          }
        />
      )}
    </>
  );
}
