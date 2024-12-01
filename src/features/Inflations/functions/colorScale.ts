import { scaleLinear } from "d3";
import { inflationThreshold } from "../constants/domains";

// colors chosen from colorbrewer2.org and schubert-da.github.io/dataviz-palette-tool/

const colorsRedToBlue3 = ["#ef8a62", "#f7f7f7", "#67a9cf"].reverse();

export const thresholdColor = "#F5EEDC";

const colorsRedToBlue3v2 = ["#67a9cf", thresholdColor, "#ef8a62"];

const colorsRedToBlue4 = ["#d7191c", "#fdae61", "#abd9e9", "#2c7bb6"].reverse();

const colorsRedToBlue7 = [
    "#b2182b",
    "#ef8a62",
    "#fddbc7",
    "#f7f7f7",
    "#d1e5f0",
    "#67a9cf",
    "#2166ac",
].reverse();

const test = [
    "#d53e4f",
    "#fc8d59",
    "#fee08b",
    "#ffffbf",
    "#e6f598",
    "#99d594",
    "#3288bd",
];

const colorsRedToBlue10 = [
    "#a50026",
    "#f46d43",
    "#fdae61",
    "#fee090",
    "#e0f3f8",
    "#abd9e9",
    "#4575b4",
    "#313695",
].reverse();

const chosenColors = colorsRedToBlue3v2;

function getSamples(domain: [number, number], numberOfSamples: number) {
    return Array.from({ length: numberOfSamples }, (_, i) => {
        return domain[0] + (domain[1] - domain[0]) * (i / (numberOfSamples - 1));
    });
}

/**
 * min => green
 * 2 => yellowgreen
 * max => red
 */

export function createColorScale(_domain: [number, number]) {
    const domain = [1, 3];
    const colorDomain = [
        -domain[1] + inflationThreshold,
        domain[1] + inflationThreshold,
    ].sort((a, b) => a - b);

    //console.log(colorDomain);

    /*const colorScale = scaleLinear<string>()
        .domain(colorDomain)
        .range(["yellowgreen", "yellowgreen", "white", "red", "red"]); */

    const colorDomainSampled = getSamples(colorDomain, chosenColors.length);

    //console.log(colorDomainSampled);

    const colorScale = scaleLinear<string>()
        .domain(colorDomainSampled)
        .range(chosenColors);

    return colorScale;
}
