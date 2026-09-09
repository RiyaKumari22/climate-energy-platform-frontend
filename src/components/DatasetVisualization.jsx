import IndiaPointMap from "./IndiaPointMap";
import IndiaHeatmap from "./IndiaHeatmap";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

function DatasetVisualization({ dataset }) {
  if (!dataset) {
    return <p>No dataset available.</p>;
  }

  const {
    dataType,
    chartType,
    records,
  } = dataset;

  if (!records || records.length === 0) {
    return <p>No data available.</p>;
  }

  // Latitude / Longitude → India Map
  if (
    dataType === "LATLONG" &&
    chartType === "MAP"
  ) {
    return <IndiaPointMap records={records} />;
  }

  // State-wise → India Heatmap
  if (
    dataType === "STATE" &&
    chartType === "HEATMAP"
  ) {
    return <IndiaHeatmap records={records} />;
  }

  // Time Series → Line Chart
  if (
    dataType === "TIMESERIES" &&
    chartType === "LINE"
  ) {
    return <LineChart records={records} />;
  }

  // Time Series → Bar Chart
  if (
    dataType === "TIMESERIES" &&
    chartType === "BAR"
  ) {
    return <BarChart records={records} />;
  }

  // Time Series → Area Chart
  if (
    dataType === "TIMESERIES" &&
    chartType === "AREA"
  ) {
    return <AreaChart records={records} />;
  }

  return (
    <div>
      <p>
        Visualization not supported.
      </p>

      <p>
        Data Type: {dataType}
      </p>

      <p>
        Chart Type: {chartType}
      </p>
    </div>
  );
}

export default DatasetVisualization;