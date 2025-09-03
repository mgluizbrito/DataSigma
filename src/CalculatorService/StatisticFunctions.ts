export function calculateModa(Fi: number[]): number[] | null {

    let modas: number[] = [];
    let maxFrequency = Math.max(...Fi);

    Fi.forEach((frequency) => {
        if (frequency === maxFrequency) modas.push(frequency);
    });

    return modas;
}