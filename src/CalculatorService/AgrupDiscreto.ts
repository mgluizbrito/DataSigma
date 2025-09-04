import * as CalcFunc from './CalculateFunctions.ts';

let Xi: number[] = [];
let Fi: number[] = [];
let unitMeasure: string;

export function initCalculateByTable(): void {
    
    document.querySelector('.calculate-button')?.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Pega os dados da tabela
        const xiFields = document.querySelectorAll('.xi-field') as NodeListOf<HTMLInputElement>;
        const fiFields = document.querySelectorAll('.fi-field') as NodeListOf<HTMLInputElement>;
        
        Xi = Array.from(xiFields).map(input => parseFloat(input.value));
        Fi = Array.from(fiFields).map(input => parseFloat(input.value));
        
        renderResults(Xi, Fi);

        Xi = [];
        Fi = [];
    });
}

export function initCalculateByText(): void {
    
    document.querySelector('.calculate-button')?.addEventListener('click', (event) => {
        event.preventDefault();
        
        const textInput = document.querySelector('#text-input') as HTMLTextAreaElement;
        
        let sortedAbsolutData = textInput.value.split(', ').map(num => parseFloat(num.trim())).sort((a, b) => a - b) as number[];
        let lastElement = null as number | null;
        let currentFrequency = 0 as number;

        for (let i of sortedAbsolutData) {
            
            if (i !== lastElement) {
                if (lastElement !== null) Fi.push(currentFrequency);
                
                Xi.push(i);
                currentFrequency = 1;
                lastElement = i;
                
            }else currentFrequency++;
        }
        Fi.push(currentFrequency);
        
        renderResults(Xi, Fi);

        Xi = [];
        Fi = [];
    });
}

function renderResults(Xi: number[], Fi: number[]): void {
    
    unitMeasure = (document.querySelector('#unit-measure') as HTMLInputElement).value;

    document.querySelector('.welcome-section')?.classList.add("d-none");
    const resultSection = document.querySelector('.results-section') as HTMLDivElement;
    resultSection.classList.remove('d-none');
    
    const modaCheckbox = document.getElementById('moda') as HTMLInputElement;
    const mediaCheckbox = document.getElementById('media') as HTMLInputElement;
    const medianaCheckbox = document.getElementById('mediana') as HTMLInputElement;
    const varianciaCheckbox = document.getElementById('variancia') as HTMLInputElement;
    const desvioPadraoCheckbox = document.getElementById('desvioPadrao') as HTMLInputElement;
    const coeficienteVariacaoCheckbox = document.getElementById('coeficienteVariacao') as HTMLInputElement;

    if (modaCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-moda')) document.querySelector('.result-moda')?.remove();

        let modas = CalcFunc.calcModa(Xi, Fi) as number[];

        let modaDiv = document.createElement('div');
        modaDiv.className = 'result-item result-moda';
        modaDiv.innerHTML = `
            <span class="result-label">Moda</span>
            <span class="result-value">${CalcFunc.getModaType(modas)}: (${modas.join(', ')}) ${unitMeasure}</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(modaDiv);
    }
    
    if (mediaCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-media')) document.querySelector('.result-media')?.remove();

        let media = CalcFunc.calcMedia(Xi, Fi) as number;

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

        let mediana = CalcFunc.calcMediana(Xi, Fi) as number;

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

        let variancia = CalcFunc.calcVariancia(Xi, Fi) as number;

        let varianciaDiv = document.createElement('div');
        varianciaDiv.className = 'result-item result-variancia';
        varianciaDiv.innerHTML = `
            <span class="result-label">Variancia</span>
            <span class="result-value">${variancia} ${unitMeasure}</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(varianciaDiv);
    }

    if (desvioPadraoCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-desvioPadrao')) document.querySelector('.result-desvioPadrao')?.remove();

        let desvioPadrao = CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(Xi, Fi)) as number;

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

        let coeficienteVariacao = CalcFunc.calcCoeficienteVariacao(CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(Xi, Fi)), CalcFunc.calcMedia(Xi, Fi)) as number;

        let coeficienteVariacaoDiv = document.createElement('div');
        coeficienteVariacaoDiv.className = 'result-item result-coeficienteVariacao';
        coeficienteVariacaoDiv.innerHTML = `
            <span class="result-label">Coeficiente de Variação</span>
            <span class="result-value">${coeficienteVariacao} ${unitMeasure} %</span>
        `;

        resultSection.querySelector('.results-list')?.appendChild(coeficienteVariacaoDiv);
    }

}