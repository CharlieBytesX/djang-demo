import PageTitle from "@/components/shared/PageTitle";
import MainLayout from "@/layouts/MainLayout";
import { formatPrice, formatTelephoneNumber } from "@/lib/format";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RiseLoader } from "react-spinners";

export default function CarPostPage() {
  const { id } = useParams();
  const { isPending, data } = useQuery({
    queryKey: ["load_car_post_by_id"],
    queryFn: async () => {
      const res = await fetch(`/api/list_car_post/${id}`);
      if (res.ok) {
        const car = await res.json();
        return car;
      }
      throw new Error("unexpected error");
    },
  });
  return (
    <MainLayout>
      {isPending && (
        <RiseLoader className="mx-auto my-auto" color="darkturquoise" />
      )}

      {!isPending && (
        <>
          <div className="border px-6 py-4 rounded-lg bg-white drop-shadow-sm">
            <PageTitle>{data.title}</PageTitle>
            <div className="flex flex-col overflow-auto ">
              <section className=" flex gap-2">
                <span className="font-semibold">Description:</span>
                <span>{data.description}</span>
              </section>
              <section className=" flex gap-2">
                <span className="font-semibold">Contact Number:</span>
                <span>{formatTelephoneNumber(data.contact_number)}</span>
              </section>
              <section className=" flex gap-2">
                <span className="font-semibold">Price:</span>
                <span>₡{formatPrice(data.price)}</span>
              </section>
              <img
                className=" max-w-lg h-full self-center"
                src={data.car_image}
              ></img>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
