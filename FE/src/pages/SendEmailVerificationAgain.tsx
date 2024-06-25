import { DialogHelper } from "@/components/dialogs/AlertDialog";
import Loader from "@/components/shared/Loader";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authManager } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export default function SendEmailVerificationAgain() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const resendEmail = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        "/api/resend_email",
        authManager.addAuthToRequest({
          method: "POST",
          body: formData,
        }),
      );
      if (response.status == 200) {
        setShowSuccessDialog(true);
        return "OK";
      }
      throw new Error("error");
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formContent = new FormData(e.currentTarget);
    resendEmail.mutate(formContent);
  }

  return (
    <>
      <div className="h-screen bg-slate-100 flex flex-col items-center justify-center ">
        <div className="bg-white rounded-lg px-4 py-3 flex flex-col">
          <div className="w-44 self-center">
            <Logo />
          </div>
          <h1 className="self-center font-semibold text-xl mt-2">
            Resend confirmation email
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <Label className="mt-2">Email:</Label>
            <Input
              required={true}
              name="email"
              type="email"
              className="mt-1"
            ></Input>
            <div className="self-center mt-2 flex justify-center ">
              {resendEmail.isPending && <Loader />}
            </div>
            <Button disabled={resendEmail.isPending} className="mt-2 w-full">
              Resend email
            </Button>
          </form>
        </div>
      </div>

      {showSuccessDialog && (
        <DialogHelper
          open={true}
          title="Email confirmation sent"
          okAction={() => {
            setShowSuccessDialog(false);
          }}
          okLabel="Ok"
        >
          Pls check your email and follow the instructions to activate your
          account
        </DialogHelper>
      )}
    </>
  );
}
