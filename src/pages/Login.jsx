
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      login(user, token);

      if (user.role === "SUPER_ADMIN") {
        navigate("/super-admin");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F7F8F3] px-6 py-16">
      <div className="mx-auto max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#176B3A] text-xl font-bold text-white">
            V
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#173B2A]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#66736C]">
            Sign in to manage climate, energy and power datasets.
          </p>

        </div>

        <div className="border border-[#DCE4DE] bg-white p-6 shadow-sm sm:p-8">

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#3F4A44]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border border-[#CDD8D1] bg-white px-4 py-3 text-sm text-[#173B2A] outline-none transition placeholder:text-[#9AA69F] focus:border-[#176B3A] focus:ring-2 focus:ring-[#DCEBE1]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#3F4A44]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border border-[#CDD8D1] bg-white px-4 py-3 text-sm text-[#173B2A] outline-none transition placeholder:text-[#9AA69F] focus:border-[#176B3A] focus:ring-2 focus:ring-[#DCEBE1]"
              />
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#176B3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12562E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs leading-5 text-[#66736C]">
            Public datasets can be explored without an account.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
