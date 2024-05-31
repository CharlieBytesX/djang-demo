import { getToken } from "@/lib/getToken";
import {
	type ChangeEvent,
	type FormEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface FormContent {
	title: string;
	description: string;
	image: string | undefined;
	price: number
	contactNumber: string
	imageInput: string;
}

function emptyFormContent(): FormContent {
	return {
		title: "",
		description: "",
		image: "",
		imageInput: "",
		contactNumber: "",
		price: 0
	}
}


export const useNewCarPostLogic = () => {

	const navigator = useNavigate();
	const [loading, setLoading] = useState(false);
	const [showSuccesDialog, setShowSuccessDialog] = useState(false)
	const [error, setError] = useState("");
	const [csrfToken, setCSRFToken] = useState("");
	const [content, setContent] = useState(emptyFormContent)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setContent({ ...content, image: (reader.result) as string })
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChangeTitle = (value: string) => {
		setContent({ ...content, title: value })
	}

	const handleChangeContactNumber = (value: string) => {
		const regex = /^[0-9]+$/;

		if (!regex.test(value) && value.length !== 0) {
			return
		}
		if (value.length > 8) {
			return
		}

		setContent({ ...content, contactNumber: value })
	}

	const handleChangePrice = (value: number) => {
		setContent({ ...content, price: value })
	}

	const handleChangeDescription = (value: string) => {
		setContent({ ...content, description: value })
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			const response = await fetch("/api/create_car_post", {
				method: "POST",
				headers: {
					"X-CSRFToken": getToken(),
				},
				body: formData,
			});

			if (response.ok) {
				setLoading(false);
				setError("");
				setShowSuccessDialog(true)
			} else {
				setLoading(false);
				setError("Error creating post");
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError("Error creating post");
		}
	};

	function createNewCarPost() {
		setContent(emptyFormContent())
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
		setShowSuccessDialog(false)
	}

	useEffect(() => {
		const prepareToken = () => {
			setCSRFToken(getToken());
		};

		prepareToken();
		return () => { };
	}, []);

	return {
		csrfToken,
		setShowSuccessDialog,
		fileInputRef,
		createNewCarPost,
		navigator,
		handleSubmit,
		handleImageChange,
		showSuccesDialog,
		loading,
		error,
		content,
		handleChangeTitle,
		handleChangeDescription,
		handleChangePrice,
		handleChangeContactNumber


	}

}
