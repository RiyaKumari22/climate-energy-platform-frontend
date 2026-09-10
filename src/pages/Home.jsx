
import { Link } from "react-router-dom";

function Home() {
  const domains = [
    {
      title: "Climate",
      description:
        "Explore climate datasets, trends and geographic insights.",
      path: "/climate",
      icon: "🌍",
    },
    {
      title: "Energy",
      description:
        "Discover energy data and visualizations across India.",
      path: "/energy",
      icon: "⚡",
    },
    {
      title: "Power",
      description:
        "Explore power-sector datasets through interactive visualizations.",
      path: "/power",
      icon: "🔌",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F3]">

      {/* Hero */}
      <section className="border-b border-[#E1E7E2] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex border-l-4 border-[#176B3A] bg-[#EEF4EF] px-4 py-2 text-sm font-semibold text-[#176B3A]">
              Climate • Energy • Power
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#173B2A] sm:text-5xl lg:text-6xl">
              Explore India's climate,
              <br />
              energy & power data.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#59665F]">
              A centralized platform for exploring datasets and
              interactive visualizations across India's climate,
              energy and power sectors.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/climate"
                className="bg-[#176B3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12562E]"
              >
                Explore Datasets
              </Link>

              <Link
                to="/energy"
                className="border border-[#176B3A] bg-white px-6 py-3 text-sm font-semibold text-[#176B3A] transition hover:bg-[#176B3A] hover:text-white"
              >
                View Energy Data
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#176B3A]">
            Data domains
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#173B2A]">
            Explore by sector
          </h2>

          <p className="mt-3 max-w-2xl text-[#59665F]">
            Browse approved datasets and interactive visualizations
            across India's climate, energy and power sectors.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {domains.map((domain) => (
            <Link
              key={domain.title}
              to={domain.path}
              className="group border border-[#DCE4DE] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#176B3A] hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center bg-[#EEF4EF] text-2xl">
                {domain.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#173B2A]">
                {domain.title}
              </h3>

              <p className="mt-3 leading-7 text-[#59665F]">
                {domain.description}
              </p>

              <div className="mt-6 text-sm font-bold text-[#176B3A] transition group-hover:translate-x-1">
                Explore {domain.title} →
              </div>

            </Link>
          ))}

        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[#E1E7E2] bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid gap-12 md:grid-cols-3">

            <div>
              <div className="text-2xl">📊</div>

              <h3 className="mt-5 text-lg font-bold text-[#173B2A]">
                Interactive visualizations
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#59665F]">
                Understand datasets through maps, state heatmaps
                and time-series charts.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔎</div>

              <h3 className="mt-5 text-lg font-bold text-[#173B2A]">
                Data-driven insights
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#59665F]">
                Explore structured datasets and identify patterns
                across different sectors and locations.
              </p>
            </div>

            <div>
              <div className="text-2xl">✓</div>

              <h3 className="mt-5 text-lg font-bold text-[#173B2A]">
                Reviewed datasets
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#59665F]">
                Only approved datasets are made available on the
                public platform.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="bg-[#173B2A] px-8 py-14 text-center sm:px-12">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B8D5C0]">
            Vasudha Data Platform
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white">
            Explore the data
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#D7E4DB]">
            Start exploring climate, energy and power datasets
            through interactive visualizations.
          </p>

          <div className="mt-8">

            <Link
              to="/climate"
              className="inline-flex bg-white px-6 py-3 text-sm font-bold text-[#176B3A] transition hover:bg-[#EEF4EF]"
            >
              Start Exploring →
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
