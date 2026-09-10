import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            V
          </div>

          <div>
            <p className="text-base font-bold text-slate-900">
              Vasudha
            </p>

            <p className="text-xs text-slate-500">
              Climate • Energy • Power
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1">

          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Home
          </NavLink>

          {/* Climate */}
          <NavLink
            to="/climate"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Climate
          </NavLink>

          {/* Energy */}
          <NavLink
            to="/energy"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Energy
          </NavLink>

          {/* Power */}
          <NavLink
            to="/power"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Power
          </NavLink>

          {/* =========================
              LOGGED-IN USER
          ========================== */}

          {user ? (
            <div className="ml-4 flex items-center gap-3">

              {/* Profile */}
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">

                {/* Profile Initial */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name and Role */}
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user.role === "SUPER_ADMIN"
                      ? "Super Admin"
                      : "Admin"}
                  </p>
                </div>

              </div>

              {/* Dashboard */}
              <Link
                to={
                  user.role === "SUPER_ADMIN"
                    ? "/super-admin"
                    : "/admin"
                }
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>

            </div>
          ) : (
            /* =========================
               NOT LOGGED-IN USER
            ========================== */

            <Link
              to="/login"
              className="ml-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Admin Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;