import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/layouts/MainLayout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCarLogic } from "../newCarPost/useCarPostLogic";
import { DialogHelper } from "@/components/dialogs/DialogHelper";

export default function EditCarPage() {
  const { id } = useParams();
  const logic = useCarLogic();
  const navigate = useNavigate();
  useEffect(() => {
    logic.loadCarInfo(id);
  }, [id]);

  return (
    <MainLayout>
      {logic.showSuccesDialog && (
        <DialogHelper
          open={logic.showSuccesDialog}
          title="Post edited successfully"
          okLabel="Go"
          okAction={() => navigate("/")}
          cancelLabel="Continue Editing"
          cancelAction={() => logic.setShowSuccessDialog(false)}
        >
          Go to homepage?
        </DialogHelper>
      )}
      <PageTitle>Edit Car Ad</PageTitle>

      <form
        className="mx-10 mt-4"
        onSubmit={(e) => logic.handleEditPost(e, id)}
      >
        <section className="flex flex-1 flex-col gap-2">
          <Label htmlFor="title">Title:</Label>
          <Input
            value={logic.content.title}
            onChange={(e) => logic.handleChangeTitle(e.target.value)}
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
            value={logic.content.description}
            onChange={(e) => logic.handleChangeDescription(e.target.value)}
            name="description"
            required={true}
            className=""
          />
        </section>
        <section className="flex flex-1 flex-col gap-2 mt-2">
          <Label htmlFor="contactNumber">Contact number:</Label>
          <Input
            type={"tel"}
            onChange={(e) => logic.handleChangeContactNumber(e.target.value)}
            value={logic.content.contact_number}
            minLength={8}
            name="contact_number"
            required={true}
          />
        </section>

        <section className="flex flex-1 flex-col gap-2 mt-2">
          <Label htmlFor="price">Price in ₡:</Label>
          <Input
            type="number"
            onChange={(e) => logic.handleChangePrice(Number(e.target.value))}
            value={logic.content.price === 0 ? "" : logic.content.price}
            name="price"
          />
        </section>

        <section className="flex flex-1 flex-col gap-2 mt-2">
          <Label htmlFor="description">Car Image:</Label>
          <Input
            ref={logic.fileInputRef}
            name="car_image"
            onChange={logic.handleImageChange}
            className=""
            type="file"
            accept="image/*"
          />
        </section>
        {logic.content.image && (
          <section className=" mt-2">
            <Label>Car Image Preview:</Label>
            <img
              alt=""
              className="max-w-lg mx-auto"
              src={logic.content.image}
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
