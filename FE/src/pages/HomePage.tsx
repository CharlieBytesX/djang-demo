import { RiseLoader } from "react-spinners";

import MainLayout from "../layouts/MainLayout";
import CarCard, { type CardAd } from "@/components/shared/CarCard";
import PageTitle from "@/components/shared/PageTitle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function HomePage() {
  // const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ["load_posts"],
    queryFn: async () => {
      const response = await fetch("/api/list_car_post");
      const content = await response.json();
      if (response.ok) {
        return content;
      }
    },
  });

  return (
    <MainLayout>
      <PageTitle>Cars</PageTitle>
      {isPending && (
        <RiseLoader className="mx-auto my-auto" color="darkturquoise" />
      )}

      {!isPending && (
        <div className="flex-1 mt-4 flex flex-wrap gap-2 pb-2 ">
          {data.map((ad: CardAd) => {
            return (
              <CarCard
                clickCardAction={() => navigate(`/post/${ad.id}`)}
                key={ad.id}
                ad={ad}
              />
            );
          })}
        </div>
      )}
    </MainLayout>
  );
}
