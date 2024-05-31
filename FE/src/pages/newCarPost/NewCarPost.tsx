import { SuccesFullCreateCarPostDialog } from "@/components/dialogs/SuccesfullDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/layouts/MainLayout";
import { BounceLoader } from "react-spinners";
import { useNewCarPostLogic } from "./useNewCarPostLogic";
import PageTitle from "@/components/shared/PageTitle";

export function NewCarPost() {
  const logic = useNewCarPostLogic();
  return (
    <MainLayout>
      {logic.loading && (
        <>
          <h1 className="mx-auto font-semibold text-2xl mt-8">Saving</h1>
          <BounceLoader color="black" className="mx-auto mt-2" />
        </>
      )}

      {!logic.loading && (
        <>
          <SuccesFullCreateCarPostDialog
            open={logic.showSuccesDialog}
            createAnotherOneAction={logic.createNewCarPost}
            goToHomePageAction={() => {
              logic.navigator("/");
            }}
          />
          <PageTitle>New Car Post</PageTitle>
          <form className=" mt-4" onSubmit={logic.handleSubmit}>
            <input
              hidden={true}
              readOnly={true}
              name="csrfmiddlewaretoken"
              value={logic.csrfToken}
            />
            <section className="flex flex-1 flex-col gap-2">
              <Label htmlFor="title">Title:</Label>
              <Input
                onChange={(e) => logic.handleChangeTitle(e.currentTarget.value)}
                value={logic.content.title}
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
                onChange={(e) =>
                  logic.handleChangeDescription(e.currentTarget.value)
                }
                name="description"
                required={true}
                className=""
              />
            </section>
            <section className="flex flex-1 flex-col gap-2 mt-2">
              <Label htmlFor="contactNumber">Contact number:</Label>
              <Input
                type={"tel"}
                value={logic.content.contactNumber}
                minLength={8}
                onChange={(e) =>
                  logic.handleChangeContactNumber(e.currentTarget.value)
                }
                name="contactNumber"
                required={true}
              />
            </section>

            <section className="flex flex-1 flex-col gap-2 mt-2">
              <Label htmlFor="price">Price in ₡:</Label>
              <Input
                type="number"
                value={logic.content.price === 0 ? "" : logic.content.price}
                onChange={(e) =>
                  logic.handleChangePrice(Number(e.currentTarget.value))
                }
                name="price"
                required={true}
              />
            </section>

            <section className="flex flex-1 flex-col gap-2 mt-2">
              <Label htmlFor="description">Car Image:</Label>
              <Input
                ref={logic.fileInputRef}
                name="image"
                required={true}
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
        </>
      )}
    </MainLayout>
  );
}
