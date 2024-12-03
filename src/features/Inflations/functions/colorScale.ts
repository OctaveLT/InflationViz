import { scaleLinear } from "d3";
import { inflationThreshold } from "../constants/domains";

// colors chosen from colorbrewer2.org and schubert-da.github.io/dataviz-palette-tool/
export const thresholdColor = "#F5EEDC";

const colorsRedToBlue3v2 = ["#67a9cf", thresholdColor, "#ef8a62"];

const chosenColors = colorsRedToBlue3v2;

function getSamples(domain: [number, number], numberOfSamples: number) {
    return Array.from({ length: numberOfSamples }, (_, i) => {
        return domain[0] + (domain[1] - domain[0]) * (i / (numberOfSamples - 1));
    });
}

export function inflationColorScale() {
    const domain: [number, number] = [1, 3];

    const colorDomain: [number, number] = [
        -domain[1] + inflationThreshold,
        domain[1] + inflationThreshold,
    ];

    const colorDomainSampled = getSamples(colorDomain, chosenColors.length);

    const colorScale = scaleLinear<string>()
        .domain(colorDomainSampled)
        .range(chosenColors);

    return colorScale;
}
