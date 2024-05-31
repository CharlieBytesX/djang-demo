import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface Props {
	goToHomePageAction: () => void
	createAnotherOneAction: () => void
	open: boolean

}

export function SuccesFullCreateCarPostDialog(props: Props) {
	return (
		<AlertDialog open={props.open}>
			<AlertDialogContent onAbort={(e) => e.preventDefault()} >
				<AlertDialogHeader>
					<AlertDialogTitle>Car advertisement created correctly</AlertDialogTitle>
					<AlertDialogDescription>
						Your car advertisement is now public to the world.
						<br />
						Do you want to add another advertisement?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={props.goToHomePageAction}>Go to HomePage</AlertDialogCancel>
					<AlertDialogAction onClick={props.createAnotherOneAction}>Create another one</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

