
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#173B2A] text-white">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#176B3A] text-lg font-bold">
                V
              </div>

              <div>
                <p className="text-lg font-bold">
                  Vasudha Foundation
                </p>

                <p className="text-xs text-[#B8D5C0]">
                  Climate • Energy • Power
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#D7E4DB]">
              A data platform for exploring climate, energy and
              power datasets through accessible and interactive
              visualizations.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#B8D5C0]">
              Explore
            </h3>

            <div className="mt-5 space-y-3 text-sm">
              <Link
                to="/"
                className="block text-[#D7E4DB] transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/climate"
                className="block text-[#D7E4DB] transition hover:text-white"
              >
                Climate
              </Link>

              <Link
                to="/energy"
                className="block text-[#D7E4DB] transition hover:text-white"
              >
                Energy
              </Link>

              <Link
                to="/power"
                className="block text-[#D7E4DB] transition hover:text-white"
              >
                Power
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#B8D5C0]">
              Platform
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#D7E4DB]">
              Explore approved datasets covering different
              climate, energy and power indicators across India.
            </p>

            <Link
              to="/login"
              className="mt-5 inline-block border border-[#B8D5C0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#173B2A]"
            >
              Admin Login
            </Link>
          </div>

        </div>

        <div className="mt-12 border-t border-[#3B5B49] pt-6">

          <div className="flex flex-col gap-3 text-xs text-[#B8C9BE] sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} Vasudha Climate • Energy • Power Platform
            </p>

            <p>
              Data-driven insights for a sustainable future
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
