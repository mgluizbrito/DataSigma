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
export async function renderAgrupDiscretoCharts(
    divID: string,
    Xi: number[],
    Fi: number[],
	unitMeasure: string
): Promise<void> {

    await loadGoogleCharts();

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => drawLineChart(divID, Xi, Fi, unitMeasure));
}
function drawLineChart(divID: string, Xi: number[], Fi: number[], unitMeasure: string): void {

    const data = new google.visualization.DataTable();
    data.addColumn("string", "Xi");
    data.addColumn("number", "Fi");

    for (let i = 0; i < Xi.length; i++) {
        data.addRow([`${Xi[i].toString()} ${unitMeasure}`, Fi[i]]);
    }

    const chartConfig = {
        title: "Distribuição de Frequência",
        hAxis: { title: `Xi [${unitMeasure}]` },
        vAxis: {
            title: "Fi",
            gridlines: { count: 12 },
        },
        pointSize: 6,
        lineWidth: 2,
        legend: { position: "none" },
        bar: { groupWidth: "60%" },
        colors: ["#4c68d1"],
    };

    const chart = new google.visualization.LineChart(
        document.getElementById(divID)
    );
    chart.draw(data, chartConfig);
}

export async function renderAgrupClassesCharts(
    divID: string,
    Li: number[],
    Ls: number[],
    Fi: number[],
    pmi: number[],
	unitMeasure: string
): Promise<void> {

    await loadGoogleCharts();

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => drawHistogramaChart(divID, Li, Ls, Fi, pmi, unitMeasure));
}
function drawHistogramaChart(divID: string, Li: number[], Ls: number[], Fi: number[], pmi: number[], unitMeasure: string): void {

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Intervalo'); // Eixo X
    data.addColumn('number', 'Fi');  // Barras
    data.addColumn('number', 'PMI'); // Linha

    for (let i = 0; i < Fi.length; i++) {
        const intervalo = `${Li[i]} - ${Ls[i]} ${unitMeasure}`;
        const freq = Fi[i];
        const ogiva = pmi[i] !== undefined ? pmi[i] : freq;
        
        data.addRow([intervalo, freq, ogiva]);
    }

    const chartConfig = {
        title: 'Histograma com Ogiva de Galton',
        vAxis: { title: 'Frequência' },
        hAxis: { 
            title: `Intervalos [${unitMeasure}]`,
            gridlines: { count: 12 }
        },
        seriesType: 'bars',
        series: {
        1: { type: 'line', color: '#ff4040', lineWidth: 3, pointSize: 6 },
        },
        legend: { position: 'bottom' },
    };

    const chart = new google.visualization.ComboChart(
        document.getElementById(divID)
    );
    chart.draw(data, chartConfig);
}