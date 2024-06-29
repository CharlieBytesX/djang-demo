import { useState } from "react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  message?: string;
  open?: boolean;
  okAction?: () => void;
}

export default function ErrorDialog({ message, open, okAction }: Props) {
  const [isopen, setOpen] = useState(open);
  return (
    <AlertDialog open={isopen}>
      <AlertDialogTrigger />
      {/*   <Button variant="outline">Show Dialog</Button> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>There was an error</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              if (okAction) {
                okAction();
              }
            }}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
