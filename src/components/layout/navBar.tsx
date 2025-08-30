import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors";
import { logout } from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleCreateAdvertRedirect = () => {
    navigate("/adverts/new-advert");
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  return (
    <header>
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex flex-col items-center">
            <ShoppingCart className="text-indigo-600 w-10 h-10" />
            <h1 className="text-xl font-bold text-gray-800 mt-1 select-none">
              WallaStore
            </h1>
          </div>
        </Link>
        <div className="flex space-x-4">
          {isAuthenticated && (
            <button
              onClick={handleCreateAdvertRedirect}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              New Advert
            </button>
          )}

          {!isAuthenticated ? (
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
