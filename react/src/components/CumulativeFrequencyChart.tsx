import { Chart } from "react-google-charts";

interface ChartProps {
  Xi: number[];
  Fa: number[];
}

export const CumulativeFrequencyChart = ({ Xi, Fa }: ChartProps) => {
  const data = [["Xi", "Frequência Acumulada"], ...Xi.map((xi, i) => [xi.toString(), Fa[i]])];

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        title: "Diagrama de Frequência Acumulada",
        hAxis: { title: "Xi" },
        vAxis: { title: "Frequência Acumulada" },
      }}
    />
  );
};