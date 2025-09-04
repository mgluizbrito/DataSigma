// Algoritimo de Moda
export function calcModa(Xi:number[], Fi: number[]): number[] | null {

    let modas: number[] = [];
    let maxFrequency = Math.max(...Fi);

    Fi.forEach((frequency, i) => {
        if (frequency === maxFrequency) modas.push(Xi[i]);
    });

    return modas;
}

export function getModaType(modas: number[]): string {
    if (modas.length === 0) return "Amodal";
    if (modas.length === 1) return "Unimodal";
    if (modas.length === 2) return "Bimodal";
    if (modas.length === 3) return "Trimodal";
    return "Multimodal";
}

// Algoritimo de Média
export function calcMedia(Xi: number[], Fi: number[]): number{
    let sumXiFi: number = 0;
    let sumFi: number = amostraLength(Fi);
    
    Fi.forEach((freq, i) => sumXiFi += Xi[i] * Fi[i]);
    
    return sumXiFi / sumFi;
}

// Algoritimo Mediana
export function calcMediana(Xi: number[], Fi: number[]): number{
    let sumFi: number = amostraLength(Fi);
    
    if (sumFi % 2 === 1) return Xi[(sumFi + 1) / 2];
    
    const Me = ((sumFi / 2) + (sumFi / 2 + 1)) / 2;
    return Xi[Me];
}

// Algoritimo Variancia
export function calcVariancia(Xi: number[], Fi: number[]){
    let sumXi_medXi_Fi: number = 0;
    let sumFi: number = amostraLength(Fi);
    
    Fi.forEach((freq, i) => sumXi_medXi_Fi += ((Xi[i] - calcMedia(Xi, Fi)) ** 2) * freq);
    
    return sumXi_medXi_Fi / (sumFi - 1);
}

// Algoritimo Desvio Padrão
export function calcDesvioPadrao(variancia: number) { return Math.sqrt(variancia) };

// Algoritimo Desvio Padrão (%)
export function calcCoeficienteVariacao(desvioPadrao: number, media: number){
    return 100 * desvioPadrao / media;
}

// Calcula o tamanho da amostra (N)
function amostraLength(Fi: number[]): number {
    let sumFi: number = 0;
    Fi.forEach(freq => sumFi += freq);
    return sumFi;
}