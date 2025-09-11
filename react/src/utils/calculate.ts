export function calcModa(Xi: number[], Fi: number[]): number[] {
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
    if (modas.length === 4) return "Tetramodal";
    if (modas.length === 5) return "Pentamodal";
    if (modas.length === 6) return "Hexamodal";
    if (modas.length === 7) return "Heptamodal";
    if (modas.length === 8) return "Octamodal";
    if (modas.length === 9) return "Nonamodal";
    if (modas.length === 10) return "Decamodal";
    return "Multimodal";
}

export function calcMedia(Xi: number[], Fi: number[]): number {
    let sumXiFi = 0;
    let sumFi = amostraLength(Fi);
    for (let i in Fi) sumXiFi += Xi[i] * Fi[i];
    return parseFloat((sumXiFi / sumFi).toFixed(2));
}

export function calcMediana(Xi: number[], Fi: number[]): number | null {
    const freqAcumulada = calcFreqAcumulada(Fi);
    const posicaoMediana = freqAcumulada[freqAcumulada.length - 1] / 2;
    const i = freqAcumulada.findIndex(freq => posicaoMediana <= freq);
    return i !== -1 ? Xi[i] : null;
}

export function calcVariancia(Xi: number[], Fi: number[]) {
    let sumXi_medXi_Fi = 0;
    let sumFi = amostraLength(Fi);
    const media = calcMedia(Xi, Fi);
    Fi.forEach((freq, i) => sumXi_medXi_Fi += ((Xi[i] - media) ** 2) * freq);
    return parseFloat((sumXi_medXi_Fi / (sumFi - 1)).toFixed(2));
}

export function calcDesvioPadrao(variancia: number): number {
    return parseFloat(Math.sqrt(variancia).toFixed(2));
}

export function calcCoeficienteVariacao(desvioPadrao: number, media: number): number {
    return parseFloat((100 * desvioPadrao / media).toFixed(2));
}

export function calcFreqAcumulada(Fi: number[]) {
    let freqAcumulada: number[] = [];
    let facAnterior = 0;
    Fi.forEach(freq => {
        facAnterior += freq;
        freqAcumulada.push(facAnterior);
    });
    return freqAcumulada;
}

function amostraLength(Fi: number[]): number {
    return Fi.reduce((a, b) => a + b, 0);
}

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

export function calcModaCzuber(Li: number[], Fi: number[], amplitudes: number[]): number[] {
    const maiorFrequencia = Math.max(...Fi);
    const indicesModa: number[] = [];

    Fi.forEach((frequencia, index) => {
        if (frequencia === maiorFrequencia) {
            indicesModa.push(index);
        }
    });

    const modas: number[] = [];

    indicesModa.forEach(indice => {
        const lio = Li[indice];
        const ao = amplitudes[indice];

        const fiAnterior = indice > 0 ? Fi[indice - 1] : 0;
        const d1 = maiorFrequencia - fiAnterior;

        const fiPosterior = indice < Fi.length - 1 ? Fi[indice + 1] : 0;
        const d2 = maiorFrequencia - fiPosterior;

        const moda = lio + (d1 / (d1 + d2)) * ao;
        modas.push(parseFloat(moda.toFixed(2)));
    });

    return modas;
}

export function calcMedianaClasses(Li: number[], Ls: number[], Fi: number[]): number | null {
    if (Li.length === 0 || Ls.length === 0 || Fi.length === 0) {
        return null;
    }

    const N = Fi.reduce((sum, current) => sum + current, 0);

    const freqAcumulada = Fi.reduce((acc, current, i) => {
        if (i === 0) {
            return [current];
        }
        return [...acc, acc[i - 1] + current];
    }, [] as number[]);

    const posicaoMediana = N / 2;

    const i = freqAcumulada.findIndex(fa => fa >= posicaoMediana);

    if (i === -1) {
        return null;
    }

    const Fant = i > 0 ? freqAcumulada[i - 1] : 0;

    const Linf = Li[i];

    const fmed = Fi[i];

    const h = Ls[i] - Li[i];

    const mediana = (Linf + ((posicaoMediana - Fant) / fmed) * h).toFixed(2);

    const medianaValue = parseFloat(mediana)

    return medianaValue;
}