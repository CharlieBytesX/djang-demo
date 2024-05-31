import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NewCarPost } from "./pages";
import CarPostPage from "./pages/CarPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import RegisterPage from "./pages/RegisterPage";
import EditCarPage from "./pages/editCar/EditCarPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<CarPostPage />} />
          <Route path="/create_post" element={<NewCarPost />} />
          <Route path="/sign_up" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/*Protected client routes */}
          <Route path="/edit_my_post/:id" element={<EditCarPage />} />
          <Route path="/my_posts" element={<MyPostsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
