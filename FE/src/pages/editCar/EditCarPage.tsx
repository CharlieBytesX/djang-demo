import type { CardAd } from "@/components/shared/CarCard";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditCarPage() {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [carInformation, setCarInformation] = useState<CardAd | undefined>();
	

	useEffect(() => {
		const loadCarInfo = async () => {
			console.log("asdfasdf")
			setLoading(true)
			try {
				const response = await fetch(`/api/list_car_post/${id}`);
					console.log(response)
				if (response.ok) {
					const jsonBody = await response.json();
					console.log(jsonBody)
					setCarInformation(jsonBody);
				}
			} catch (error) {
				console.log(error)
			}
			setLoading(false)
		};
		loadCarInfo();
	}, [id]);

	return (
		<MainLayout>
			<PageTitle>Edit Car Ad</PageTitle>

			<form className="mx-10 mt-4" >
				<section className="flex flex-1 flex-col gap-2">
					<Label htmlFor="title">Title:</Label>
					<Input
						value={carInformation?.title}
						maxLength={200}
						name="title"
						required={true}
						className=""
						type="text"
					/>
				</section>
				<section className="flex flex-1 flex-col gap-2 mt-2">
					<Label htmlFor="description">Description:</Label>
					<Textarea
						value={carInformation?.description}
						name="description"
						required={true}
						className=""
					/>
				</section>
				<section className="flex flex-1 flex-col gap-2 mt-2">
					<Label htmlFor="contactNumber">Contact number:</Label>
					<Input
						type={"tel"}
						value={carInformation?.contact_number}
						minLength={8}
						name="contactNumber"
						required={true}
					/>
				</section>

				<section className="flex flex-1 flex-col gap-2 mt-2">
					<Label htmlFor="price">Price in ₡:</Label>
					<Input
						type="number"
						value={carInformation?.price === 0 ? "" : carInformation?.price}
						name="price"
						required={true}
					/>
				</section>

				<section className="flex flex-1 flex-col gap-2 mt-2">
					<Label htmlFor="description">Car Image:</Label>
					<Input
						name="image"
						required={true}
						className=""
						type="file"
						accept="image/*"
					/>
				</section>
				{carInformation?.car_image && (
					<section className=" mt-2">
						<Label>Car Image Preview:</Label>
						<img
							alt=""
							className="max-w-lg mx-auto"
							src={carInformation?.car_image}
						/>
					</section>
				)}
				<Button className="float-end mt-2" variant={"default"}>
					Publish
				</Button>
			</form>
		</MainLayout>
	);
}
