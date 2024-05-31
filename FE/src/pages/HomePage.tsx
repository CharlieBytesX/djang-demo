import { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";

import MainLayout from "../layouts/MainLayout";
import CarCard, { type CardAd } from "@/components/shared/CarCard";
import PageTitle from "@/components/shared/PageTitle";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/list_car_post");
        const content = await response.json();
        setData(content);
        console.log(content);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    load();
  }, []);

  return (
    <MainLayout>
      <PageTitle>Cars</PageTitle>
      {loading && (
        <RiseLoader className="mx-auto my-auto" color="darkturquoise" />
      )}

      {!loading && (
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
