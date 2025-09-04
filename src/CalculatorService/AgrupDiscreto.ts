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
        console.log(Xi, Fi)
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
        console.log(Xi, Fi)
        Xi = [];
        Fi = [];
    });
}

function renderResults(Xi: number[], Fi: number[]): void {
    
    unitMeasure = (document.querySelector('#unit-measure') as HTMLInputElement).value;

    const resultSection = document.querySelector('.results-section') as HTMLDivElement;
    resultSection.classList.remove('d-none');
    
    const modaCheckbox = document.querySelector('#moda') as HTMLInputElement;
    
    if (modaCheckbox.checked) {
        //apaga se já existir
        if (resultSection.querySelector('.result-moda')) document.querySelector('.result-moda')?.remove();

        let modas = CalcFunc.calcModa(Xi, Fi) as number[];

        let modaDiv = document.createElement('div');
        modaDiv.className = 'result-item result-moda';
        modaDiv.innerHTML = `
            <span class="result-label">Moda</span>
            <span id="result-moda" class="result-value">${CalcFunc.getModaType(modas)}: (${modas.join(', ')}) ${unitMeasure}</span>
        `;
        console.log(modas);
        resultSection.querySelector('.results-list')?.appendChild(modaDiv);
    }

}