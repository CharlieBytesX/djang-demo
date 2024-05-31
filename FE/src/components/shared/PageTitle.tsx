import type { ReactNode } from "react";

interface Props {
	children: ReactNode

}
export default function PageTitle(props: Props) {
	return <h1 className="font-semibold text-3xl">{props.children}</h1>;
}
