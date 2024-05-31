import MainLayout from "@/layouts/MainLayout";
import { useParams } from "react-router-dom";

export default function CarPostPage() {
  const { id } = useParams();
  return <MainLayout>{id}</MainLayout>;
}
