
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-[#176B3A] font-semibold"
        : "text-[#3F4A44] hover:text-[#176B3A]"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E5EAE6] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-[#176B3A] text-lg font-bold text-white">
            V
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-[#173B2A]">
              Vasudha Foundation
            </p>

            <p className="text-xs text-[#66736C]">
              Climate • Energy • Power
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/climate" className={navClass}>
            Climate
          </NavLink>

          <NavLink to="/energy" className={navClass}>
            Energy
          </NavLink>

          <NavLink to="/power" className={navClass}>
            Power
          </NavLink>

          {user ? (
            <div className="ml-5 flex items-center gap-3">

              {/* Profile */}
              <div className="flex items-center gap-2 border-l border-[#E5EAE6] pl-5">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1EB] text-sm font-semibold text-[#176B3A]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#173B2A]">
                    {user.name}
                  </p>

                  <p className="text-xs text-[#66736C]">
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
                className="bg-[#176B3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#12562E]"
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="border border-[#D5DDD8] px-4 py-2 text-sm font-medium text-[#3F4A44] transition-colors hover:border-[#176B3A] hover:text-[#176B3A]"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="ml-3 border border-[#176B3A] px-4 py-2 text-sm font-medium text-[#176B3A] transition-colors hover:bg-[#176B3A] hover:text-white"
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
