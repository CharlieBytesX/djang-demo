import CarCard, { type CardAd } from "@/components/shared/CarCard";
import PageTitle from "@/components/shared/PageTitle";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const reponse = await fetch("/api/list_my_car_posts");
        const bodyJson = await reponse.json();
        setMyPosts(bodyJson);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageTitle>My Car Posts</PageTitle>
      {loading && (
        <RiseLoader className="mx-auto my-auto" color="darkturquoise" />
      )}

      {!loading && (
        <div className="flex-1 mt-4 flex flex-wrap gap-2 pb-2 ">
          {myPosts.map((ad: CardAd) => {
            return (
              <CarCard
                key={ad.id}
                ad={ad}
                showEditButton={true}
                editButtonAction={() => {
                  navigate(`/edit_my_post/${ad.id}`);
                }}
                eraseButtonAction={() => {}}
                clickCardAction={() => {
                  navigate(`/post/${ad.id}`);
                }}
                showEraseButton={true}
              />
            );
          })}
        </div>
      )}
    </MainLayout>
  );
}
