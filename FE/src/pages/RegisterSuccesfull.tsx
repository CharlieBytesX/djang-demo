import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function RegisterSuccesfull() {
  const resendEmail = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/sign_up", {
        method: "POST",
        body: formData,
      });
      if (res.status != 200) {
        if (res.status == 400) {
          let r = await res.json();
          return r;
        }
        throw new Error("Pls try again later or contact support");
      }
    },
  });
  return (
    <div className="flex flex-col bg-slate-100 items-center justify-center h-screen">
      <div className="bg-white border rounded-lg flex w-80   px-4 py-4 flex-col items-center justify-center">
        <h1 className="font-semibold text-xl">Verify your account</h1>
        <p className="text-center mt-2">
          An email was sent to you, pls see activation instructions there
        </p>
        <p className="text-xs mt-2">
          If you don't see the email pls
          <button className="ml-1 font-semibold underline">click here</button>
        </p>
      </div>
    </div>
  );
}
