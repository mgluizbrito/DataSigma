export function calculateModa(Xi:number[], Fi: number[]): number[] | null {

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