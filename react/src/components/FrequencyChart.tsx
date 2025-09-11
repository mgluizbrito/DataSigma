import { Chart } from "react-google-charts";

interface ChartProps {
  Xi: number[];
  Fi: number[];
}

interface ChartPropsClass {
  Li: number[];
  Ls: number[];
  Fi: number[];
  Pmi: number[];
}

type ChartWrapperType = "ColumnChart" | "ComboChart";

export const FrequencyChart = (props: ChartProps | ChartPropsClass) => {
  let data;
  let chartType: ChartWrapperType;
  let options;

  if ("Li" in props && "Ls" in props && "Pmi" in props) {
    const { Li, Ls, Fi, Pmi } = props;
    chartType = "ComboChart";

    const labels = Li.map((l, i) => `${l} - ${Ls[i]}`);
    
    data = [
      ["Classe", "Classe", "PMI"],
      ...labels.map((label, i) => [label, Fi[i], Pmi[i]]),
    ];

    options = {
      title: "Histograma com Ogiva de Galton",
      vAxis: { title: "Frequência" },
      hAxis: { title: "Classes" },
      seriesType: "bars",
      series: {
        0: { 
          type: "bars",
          color: "#4285F4", 
        },
        1: { 
          type: "line",
          color: "#EA4335", 
          pointSize: 8,      
          lineWidth: 3,      
          pointShape: 'circle', 
        }
      }, 
      isStacked: true, 
    };

  } else if ("Xi" in props) {
    const { Xi, Fi } = props;
    chartType = "ColumnChart";
    data = [
      ["Xi", "Frequência"],
      ...Xi.map((xi, i) => [xi.toString(), Fi[i]]),
    ];
    options = {
      title: "Diagrama de Frequência Absoluta",
      hAxis: { title: "Xi" },
      vAxis: { title: "Fi" },
      legend: { position: "none" },
    };

  } else {
    return null; 
  }

  return (
    <Chart
      chartType={chartType}
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};