// Algoritimo de Moda
export function calcModa(Xi:number[], Fi: number[]): number[] | null {

    let modas: number[] = [];
    let maxFrequency = Math.max(...Fi);

    Fi.forEach((frequency, i) => {
        if (frequency > 1 && frequency === maxFrequency) modas.push(Xi[i]);
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
    
    for (let i in Fi) sumXiFi += Xi[i] * Fi[i];
    
    return parseFloat((sumXiFi / sumFi).toFixed(2));
}

// Algoritimo Mediana
export function calcMediana(Xi: number[], Fi: number[]): number | null{
    const freqAcumulada = calcFreqAcumulada(Fi);
    const posicaoMediana = freqAcumulada[freqAcumulada.length - 1] / 2;

    const i = freqAcumulada.findIndex(freq => posicaoMediana <= freq);
    return i !== -1 ? Xi[i] : (Xi[i] + Xi[i + 1]) / 2;
}

// Algoritimo Variancia
export function calcVariancia(Xi: number[], Fi: number[]){
    let sumXi_medXi_Fi: number = 0;
    let sumFi: number = amostraLength(Fi);
    
    Fi.forEach((freq, i) => sumXi_medXi_Fi += ((Xi[i] - calcMedia(Xi, Fi)) ** 2) * freq);
    
    return parseFloat((sumXi_medXi_Fi / (sumFi - 1)).toFixed(2));
}

// Algoritimo Desvio Padrão
export function calcDesvioPadrao(variancia: number): number { return parseFloat(Math.sqrt(variancia).toFixed(2)) };

// Algoritimo Desvio Padrão (%)
export function calcCoeficienteVariacao(desvioPadrao: number, media: number): number{
    return parseFloat((100 * desvioPadrao / media).toFixed(2));
}

// Algoritimo Frequencia Acumulada (FAC)
export function calcFreqAcumulada(Fi: number[]){
    let freqAcumulada: number[] = [];
    let facAnterior: number = 0; 

    Fi.forEach(freq => {
        facAnterior += freq;
        freqAcumulada.push(facAnterior)
    })

    return freqAcumulada;
}

// Calcula o tamanho da amostra (N)
function amostraLength(Fi: number[]): number {
    let sumFi: number = 0;
    Fi.forEach(freq => sumFi += freq);
    return sumFi;
}