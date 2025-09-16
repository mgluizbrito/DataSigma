import * as CalcFunc from './CalculateFunctions.ts';
import {renderAgrupClassesCharts} from '../gcharts/gchart-render.ts';

let Li: number[] = [];
let Ls: number[] = [];
let Fi: number[] = [];
let unitMeasure: string;

export default function initCalculateByClass(): void {
    
    document.querySelector('.calculate-button')?.addEventListener('click', event => {
        event.preventDefault();
        
        // Pega os dados da tabela
        const liFields = document.querySelectorAll('.li-field') as NodeListOf<HTMLInputElement>;
        const lsFields = document.querySelectorAll('.ls-field') as NodeListOf<HTMLInputElement>;
        const fiFields = document.querySelectorAll('.fi-field') as NodeListOf<HTMLInputElement>;
        
        Li = Array.from(liFields).map(input => parseFloat(input.value));
        Ls = Array.from(lsFields).map(input => parseFloat(input.value));
        Fi = Array.from(fiFields).map(input => parseFloat(input.value));
        
        renderResults(Li, Ls, Fi);

        Li = [];
        Ls = [];
        Fi = [];
    });
}

function renderResults(Li: number[], Ls: number[], Fi: number[]): void{
    unitMeasure = (document.querySelector('#unit-measure') as HTMLInputElement).value;

    const resultSection = document.querySelector('.results-section') as HTMLDivElement;
    const chartsSection = document.querySelector('.charts-section') as HTMLDivElement

    document.querySelector('.welcome-section')?.classList.add("d-none");
    resultSection.classList.remove('d-none');
    chartsSection.classList.remove('d-none');

    const modaCheckbox = document.getElementById('moda') as HTMLInputElement;
    const modaCzuberCheckbox = document.getElementById('modaCzuber') as HTMLInputElement;
    const mediaCheckbox = document.getElementById('media') as HTMLInputElement;
    const medianaCheckbox = document.getElementById('mediana') as HTMLInputElement;
    const varianciaCheckbox = document.getElementById('variancia') as HTMLInputElement;
    const desvioPadraoCheckbox = document.getElementById('desvioPadrao') as HTMLInputElement;
    const coeficienteVariacaoCheckbox = document.getElementById('coeficienteVariacao') as HTMLInputElement;

    if (modaCheckbox.checked) {
        if (resultSection.querySelector('.result-moda')) document.querySelector('.result-moda')?.remove();

        const modas = CalcFunc.calcModa(CalcFunc.calcPontoMedio(Li, Ls), Fi) as number[];

        let modaDiv = document.createElement('div');
        modaDiv.className = 'result-item result-moda';
        modaDiv.innerHTML = `
            <span class="result-label">Moda Bruta</span>
            <span class="result-value">${CalcFunc.getModaType(modas)}: (${modas.join(', ')}) ${unitMeasure}</span>
        `;
        
        resultSection.querySelector('.results-list')?.appendChild(modaDiv);
    }

    if (modaCzuberCheckbox.checked) {
        if (resultSection.querySelector('.result-moda-czuber')) document.querySelector('.result-moda-czuber')?.remove();

        const modas = CalcFunc.calcModaCzuber(Li, Fi, CalcFunc.calcAmplitudeClasse(Li, Ls)) as number[];

        let modaDiv = document.createElement('div');
        modaDiv.className = 'result-item result-moda-czuber';
        modaDiv.innerHTML = `
            <span class="result-label">Moda de Czuber</span>
            <span class="result-value">${CalcFunc.getModaType(modas)}: (${modas.join(', ')}) ${unitMeasure}</span>
        `;
        
        resultSection.querySelector('.results-list')?.appendChild(modaDiv);
    }

    if (mediaCheckbox.checked) {
            //apaga se já existir
            if (resultSection.querySelector('.result-media')) document.querySelector('.result-media')?.remove();
    
            let media = CalcFunc.calcMedia(CalcFunc.calcPontoMedio(Li, Ls), Fi) as number;
    
            let mediaDiv = document.createElement('div');
            mediaDiv.className = 'result-item result-media';
            mediaDiv.innerHTML = `
                <span class="result-label">Média</span>
                <span class="result-value">${media} ${unitMeasure}</span>
            `;
    
            resultSection.querySelector('.results-list')?.appendChild(mediaDiv);
        }

    if (medianaCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-mediana')) document.querySelector('.result-mediana')?.remove();

        const amplitudes = CalcFunc.calcAmplitudeClasse(Li, Ls);
        const fac = CalcFunc.calcFreqAcumulada(Fi);
        let mediana = CalcFunc.calcMedianaClasse(Li, Fi, fac, amplitudes) as number;
        
        let medianaDiv = document.createElement('div');
        medianaDiv.className = 'result-item result-mediana';
        medianaDiv.innerHTML = `
            <span class="result-label">Mediana</span>
            <span class="result-value">${mediana} ${unitMeasure}</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(medianaDiv);
    }

    if (varianciaCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-variancia')) document.querySelector('.result-variancia')?.remove();

        let variancia = CalcFunc.calcVariancia(CalcFunc.calcPontoMedio(Li, Ls), Fi) as number;

        let varianciaDiv = document.createElement('div');
        varianciaDiv.className = 'result-item result-variancia';
        varianciaDiv.innerHTML = `
            <span class="result-label">Variancia</span>
            <span class="result-value">(${variancia} ${unitMeasure})²</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(varianciaDiv);
    }

    if (desvioPadraoCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-desvioPadrao')) document.querySelector('.result-desvioPadrao')?.remove();

        const pmi = CalcFunc.calcPontoMedio(Li, Ls);
        let desvioPadrao = CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(pmi, Fi)) as number;

        let desvioPadraoDiv = document.createElement('div');
        desvioPadraoDiv.className = 'result-item result-desvioPadrao';
        desvioPadraoDiv.innerHTML = `
            <span class="result-label">Desvio Padrão</span>
            <span class="result-value">${desvioPadrao} ${unitMeasure}</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(desvioPadraoDiv);
    }

    if (coeficienteVariacaoCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-coeficienteVariacao')) document.querySelector('.result-coeficienteVariacao')?.remove();

        const pmi = CalcFunc.calcPontoMedio(Li, Ls);
        let coeficienteVariacao = CalcFunc.calcCoeficienteVariacao(CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(pmi, Fi)), CalcFunc.calcMedia(pmi, Fi)) as number;

        let coeficienteVariacaoDiv = document.createElement('div');
        coeficienteVariacaoDiv.className = 'result-item result-coeficienteVariacao';
        coeficienteVariacaoDiv.innerHTML = `
            <span class="result-label">Coeficiente de Variação</span>
            <span class="result-value">${coeficienteVariacao} %</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(coeficienteVariacaoDiv);
    }

    renderAgrupClassesCharts("results-charts", Li, Ls, Fi, CalcFunc.calcPontoMedio(Li, Ls), unitMeasure);

}