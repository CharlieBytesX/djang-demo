import CarCard, { type CardAd } from "@/components/shared/CarCard";
import PageTitle from "@/components/shared/PageTitle";
import MainLayout from "@/layouts/MainLayout";
import { authManager } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";

export default function MyPostsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, data } = useQuery({
    queryKey: ["my_car_posts"],
    queryFn: async () => {
      const reponse = await fetch("/api/list_my_car_posts");
      const bodyJson = await reponse.json();
      return bodyJson;
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      if (!confirm("Are you sure that you want to eliminate this post? ")) {
        return;
      }
      const response = await fetch(
        `/api/delete_car_post/${id}`,
        authManager.addAuthToRequest({
          method: "DELETE",
        }),
      );
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["my_car_posts"] });
        return "ok";
      }
      throw new Error("Unexpected Error");
    },
  });

  return (
    <MainLayout>
      <PageTitle>My Car Posts</PageTitle>
      {isPending && (
        <RiseLoader className="mx-auto my-auto" color="darkturquoise" />
      )}

      {!isPending && (
        <div className="flex-1 mt-4 flex flex-wrap gap-2 pb-2 ">
          {data.map((ad: CardAd) => {
            return (
              <CarCard
                key={ad.id}
                ad={ad}
                showEditButton={true}
                editButtonAction={() => {
                  navigate(`/edit_my_post/${ad.id}`);
                }}
                eraseButtonAction={() => {
                  deletePost.mutate(ad.id);
                }}
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
