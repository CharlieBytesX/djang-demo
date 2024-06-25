import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NewCarPost } from "./pages";
import CarPostPage from "./pages/CarPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import RegisterPage from "./pages/RegisterPage";
import EditCarPage from "./pages/editCar/EditCarPage";
import LoginPage from "./pages/LoginPage";
import RegisterSuccesfull from "./pages/RegisterSuccesfull";
import SendEmailVerificationAgain from "./pages/SendEmailVerificationAgain";
import ProtectedRoutes from "./ProtectedRoutes";

const queryClient = new QueryClient();
function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        {/*
          TODO: Crear un sub router con Rutas El auth integrado

*/}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<CarPostPage />} />
          <Route path="/sign_up" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm_email" element={<RegisterSuccesfull />} />
          <Route
            path="/resend_confirmation_email"
            element={<SendEmailVerificationAgain />}
          />

          <Route element={<ProtectedRoutes />}>
            {/*Protected client routes */}
            <Route path="/edit_my_post/:id" element={<EditCarPage />} />
            <Route path="/my_posts" element={<MyPostsPage />} />
            <Route path="/create_post" element={<NewCarPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Router;
