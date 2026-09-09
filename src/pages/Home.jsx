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
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              Climate • Energy • Power
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Explore India's climate,
              <br />
              energy & power data.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A centralized platform for exploring datasets and
              interactive visualizations across India's climate,
              energy and power sectors.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/climate"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore Datasets
              </Link>

              <Link
                to="/energy"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Energy Data
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Data domains
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Explore by sector
          </h2>

          <p className="mt-2 text-slate-600">
            Browse approved datasets and interactive visualizations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {domains.map((domain) => (
            <Link
              key={domain.title}
              to={domain.path}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                {domain.icon}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {domain.title}
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                {domain.description}
              </p>

              <div className="mt-5 text-sm font-semibold text-slate-900">
                Explore {domain.title} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-2xl">📊</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Interactive visualizations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand datasets through maps, state heatmaps
                and time-series charts.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔎</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Data-driven insights
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore structured datasets and identify patterns
                across different sectors and locations.
              </p>
            </div>

            <div>
              <div className="text-2xl">✓</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Reviewed datasets
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Only approved datasets are made available on the
                public platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-slate-900 px-8 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white">
            Explore the data
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Start exploring climate, energy and power datasets
            through interactive visualizations.
          </p>

          <div className="mt-7">
            <Link
              to="/climate"
              className="inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
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