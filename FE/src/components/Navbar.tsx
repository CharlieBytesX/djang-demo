import { Link, NavLink } from "react-router-dom";
import logoPath from "@/assets/carLogo.jpeg";
import { authManager } from "@/lib/auth";
import { useObserver } from "centinel";

const logged_links = [
  { to: "/", title: "Home" },
  { to: "/create_post", title: "Post selling car" },
  { to: "/my_posts", title: "My posts" },
];
const unprotected_links = [
  { to: "/", title: "Cars" },
  { to: "/login", title: "Login" },
];

export default function Navbar() {
  const isLoggedIn = useObserver(authManager.isLoggedIn);
  return (
    <div className="mt-4 w-full rounded-md bg-white mx-auto flex h-20   justify-between items-center  px-8">
      <Link to="/" className="  ">
        <img alt="" className="w-24 h-auto overflow-hidden" src={logoPath} />
      </Link>

      <nav className="flex  gap-10 font-semibold ">
        {isLoggedIn &&
          logged_links.map((link) => {
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
