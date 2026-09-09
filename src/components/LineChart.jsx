import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LineChart({ records }) {
  const data = records.map((record) => ({
    year: record.data.year,
    value: Number(record.data.value),
  }));

  return (
    <div className="h-[420px] w-full bg-white p-4 sm:p-6">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 5,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
            }}
            labelStyle={{
              color: "#0f172a",
              fontWeight: 600,
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#0f172a"
            strokeWidth={3}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#ffffff",
            }}
            activeDot={{
              r: 6,
              strokeWidth: 2,
            }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;