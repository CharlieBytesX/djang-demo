import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface Props {
  title: string;
  okAction: () => void;
  cancelAction?: () => void;
  cancelLabel?: string;
  okLabel: string;
  children: ReactNode;

  open: boolean;
}

export function DialogHelper(props: Props) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent onAbort={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {props.cancelAction && (
            <AlertDialogCancel onClick={props.cancelAction}>
              {props.cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={props.okAction}>
            {props.okLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
