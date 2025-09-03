import { calculateModa } from './StatisticFunctions.ts';

let Xi: number[];
let Fi: number[];

export function initCalculateByTable(): void {

    document.querySelector('.calculate-button')?.addEventListener('click', (event) => {
        event.preventDefault();

        // Pega os dados da tabela
        const xiFields = document.querySelectorAll('.xi-field') as NodeListOf<HTMLInputElement>;
        const fiFields = document.querySelectorAll('.fi-field') as NodeListOf<HTMLInputElement>;

        Xi = Array.from(xiFields).map(input => parseFloat(input.value));
        Fi = Array.from(fiFields).map(input => parseFloat(input.value));

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

        
        
    });
}