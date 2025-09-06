declare const google: any; // Para o TS não reclamar da variável global

// Função auxiliar para carregar o script dinamicamente
function loadGoogleCharts(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.getElementById("googleChartsScript")) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.id = "googleChartsScript";
        script.src = "https://www.gstatic.com/charts/loader.js";
        script.async = true;

        script.onload = () => resolve();
        script.onerror = () => reject("Erro ao carregar Google Charts");

        document.head.appendChild(script);
    });
}

// Função principal que será exportada
export default async function renderCharts(
    divID: string,
    Xi: number[],
    Fi: number[],
	unitMeasure: string
): Promise<void> {

    await loadGoogleCharts();

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => drawChart(divID, Xi, Fi, unitMeasure));
}

function drawChart(divID: string, Xi: number[], Fi: number[], unitMeasure: string): void {

    const data = new google.visualization.DataTable();
    data.addColumn("string", "Xi");
    data.addColumn("number", "Fi");

    for (let i = 0; i < Xi.length; i++) {
        data.addRow([`${Xi[i].toString()} ${unitMeasure}`, Fi[i]]);
    }

    const chartConfig = {
        title: "Distribuição de Frequência",
        hAxis: { title: `Xi (${unitMeasure})` },
        vAxis: {
			title: "Fi",
			gridlines: { count: 12 },
		},
        legend: { position: "none" },
        bar: { groupWidth: "60%" },
		colors: ["#4c68d1"],
    };

    const chart = new google.visualization.ColumnChart(
        document.getElementById(divID)
    );
    chart.draw(data, chartConfig);
}
