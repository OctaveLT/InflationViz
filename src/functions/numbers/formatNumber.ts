import { roundToDecimal } from "./roundToDecimal";

type Options = {
    locale?: string;
    decimals?: number;
};

export function formatNumber(number: number, options?: Options): string {
    const roundedNumber = roundToDecimal(number, options?.decimals);

    const formattedNumber = new Intl.NumberFormat(options?.locale).format(
        roundedNumber,
    );

    return formattedNumber;
}
