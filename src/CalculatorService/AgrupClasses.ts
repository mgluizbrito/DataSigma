import * as CalcFunc from './CalculateFunctions.ts';
import renderCharts from '../gcharts/gchart-render.ts';

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

    const resultSection = document.querySelector('.results-section') as HTMLDivElement;

    document.querySelector('.welcome-section')?.classList.add("d-none");
    resultSection.classList.remove('d-none');

    const modaCheckbox = document.getElementById('moda') as HTMLInputElement;
    const modaCzuberCheckbox = document.getElementById('modaCzuber') as HTMLInputElement;
    const mediaCheckbox = document.getElementById('media') as HTMLInputElement;
    const medianaCheckbox = document.getElementById('mediana') as HTMLInputElement;
    const varianciaCheckbox = document.getElementById('variancia') as HTMLInputElement;
    const desvioPadraoCheckbox = document.getElementById('desvioPadrao') as HTMLInputElement;
    const coeficienteVariacaoCheckbox = document.getElementById('coeficienteVariacao') as HTMLInputElement;
}