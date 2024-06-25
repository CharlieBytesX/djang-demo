import { Link, NavLink, useNavigate } from "react-router-dom";
import logoPath from "@/assets/carLogo.jpeg";
import { authManager } from "@/lib/auth";
import { useObserver } from "centinel";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";

const logged_links = [
  { to: "/", title: "Home" },
  { to: "/create_post", title: "Post selling car" },
  { to: "/my_posts", title: "My posts" },
];
const unprotected_links = [
  { to: "/", title: "Cars" },
  { to: "/login", title: "Login" },
];

export default function LoggedNavbar() {
  const navigate = useNavigate();
  const isLoggedIn = useObserver(authManager.isLoggedIn);
  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout");
      if (res.ok) {
        authManager.logout();
        navigate("/");
        return res;
      }
      throw new Error("unexpected error");
    },
  });
  return (
    <div className="mt-4 w-full rounded-md bg-white mx-auto flex h-20   justify-between items-center  px-8">
      <Link to="/" className="  ">
        <img alt="" className="w-24 h-auto overflow-hidden" src={logoPath} />
      </Link>

      <nav className="flex  gap-10 font-semibold items-center">
        {isLoggedIn && (
          <>
            {logged_links.map((link) => {
              return (
                <NavLink
                  key={link.title}
                  to={link.to}
                  className={(props) =>
                    props.isActive
                      ? "text-black hover:text-gray-400"
                      : "text-gray-500 hover:text-gray-400"
                  }
                >
                  {link.title}
                </NavLink>
              );
            })}
            <Button onClick={() => logout.mutate()} size={"sm"}>
              Log out
            </Button>
          </>
        )}
        {}

        {!isLoggedIn &&
          unprotected_links.map((link) => {
            return (
              <NavLink
                key={link.title}
                to={link.to}
                className={(props) =>
                  props.isActive
                    ? "text-black hover:text-gray-400"
                    : "text-gray-500 hover:text-gray-400"
                }
              >
                {link.title}
              </NavLink>
            );
          })}
      </nav>
    </div>
  );
}
