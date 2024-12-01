export function roundToDecimal(number: number, decimals = 2): number {
    const factor = Math.pow(10, decimals);

    return Math.round(number * factor) / factor;
}
