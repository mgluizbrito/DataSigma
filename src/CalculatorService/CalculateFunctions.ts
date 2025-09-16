/* FUNÇÕES DO AGRUPAMENTO DISCRETO */

// Algoritimo de Moda
export function calcModa(Xi:number[], Fi: number[]): number[] | null {

    let modas: number[] = [];
    let maxFrequency = Math.max(...Fi);

    Fi.forEach((frequency, i) => {
        if (frequency > 1 && frequency === maxFrequency) modas.push(Xi[i]);
    });

    return modas;
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

/* FUNÇÕES DO AGRUPAMENTO EM CLASSES */

// Algoritimo Ponto Médio (PMI)
export function calcPontoMedio(Li: number[], Ls: number[]): number[] {
    let pmi: number[] = [];
    
    const length = Math.min(Li.length, Ls.length);
    for (let i = 0; i < length; i++) pmi.push(parseFloat(((Li[i] + Ls[i]) / 2).toFixed(2)));
    
    return pmi;
}

export function calcAmplitudeClasse(Li: number[], Ls: number[]): number[] {
    let amplitudes: number[] = [];

    const length = Math.min(Li.length, Ls.length);
    for (let i = 0; i < length; i++) amplitudes.push(parseFloat((Ls[i] - Li[i]).toFixed(2)));

    return amplitudes;
}

export function calcMedianaClasse(Li: number[], Fi: number[], fac: number[], amplitudes: number[]): number {
    // 1. Calcular a metade do total de elementos
    const Em: number = Fi.reduce((acc, current) => acc + current, 0) / 2;

    // 2. Encontrar o índice da classe da mediana
    let indiceMediana = 0;
    while (fac[indiceMediana] < Em) {
        indiceMediana++;
    }

    // 3. Obter a frequência acumulada da classe anterior (se existir)
    const facAnterior = indiceMediana > 0 ? fac[indiceMediana - 1] : 0;

    // 4. Aplicar a fórmula da mediana
    const mediana = Li[indiceMediana] + ((Em - facAnterior) / Fi[indiceMediana]) * amplitudes[indiceMediana];

    // 5. Retornar o valor arredondado
    return parseFloat(mediana.toFixed(2));
}

export function calcModaCzuber(Li: number[], Fi: number[], amplitudes: number[]): number[] {
    // 1. Encontrar a maior frequência e os seus índices
    const maiorFrequencia = Math.max(...Fi);
    const indicesModa: number[] = [];

    Fi.forEach((frequencia, index) => {
        if (frequencia === maiorFrequencia) {
            indicesModa.push(index);
        }
    });

    // 2. Calcular a moda para cada classe modal encontrada
    const modas: number[] = [];

    indicesModa.forEach(indice => {
        // Obter os valores da classe modal
        const lio = Li[indice];
        const ao = amplitudes[indice];

        // Calcular d1 (diferença para a frequência anterior)
        const fiAnterior = indice > 0 ? Fi[indice - 1] : 0;
        const d1 = maiorFrequencia - fiAnterior;

        // Calcular d2 (diferença para a frequência posterior)
        const fiPosterior = indice < Fi.length - 1 ? Fi[indice + 1] : 0;
        const d2 = maiorFrequencia - fiPosterior;

        // Aplicar a fórmula da moda de Czuber e adicionar ao array
        const moda = lio + (d1 / (d1 + d2)) * ao;
        modas.push(parseFloat(moda.toFixed(2)));
    });

    return modas;
}


/* FUNÇÕES DO GLOBAIS */

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

export function getModaType(modas: number[]): string {
    if (modas.length === 0) return "Amodal";
    if (modas.length === 1) return "Unimodal";
    if (modas.length === 2) return "Bimodal";
    if (modas.length === 3) return "Trimodal";
    if (modas.length === 4) return "Tetramodal";
    if (modas.length === 5) return "Pentamodal";
    if (modas.length === 6) return "Hexamodal";
    if (modas.length === 7) return "Heptamodal";
    if (modas.length === 8) return "Octaamodal";
    if (modas.length === 9) return "Eneamodal";
    if (modas.length === 10) return "Decamodal";
    return "Multimodal";
}