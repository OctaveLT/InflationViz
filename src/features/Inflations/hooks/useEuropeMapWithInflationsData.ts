import { ExtendedFeature } from "./d3";
import { useEuropeGeojson } from "../../../api/hooks/useEuropeGeojson";
import { useInflationsData } from "../../../api/hooks/useInflationsData";
import {
    CountryFeature,
    CountryGeometry,
    GeoJson,
} from "../../../components/viz/types";
import { InflationsData } from "../types/data";

export type MergedProperties = CountryFeature["properties"] & {
    inflations: InflationsData["data"]["data"][0];
};

export type MergedFeature = ExtendedFeature<CountryGeometry, MergedProperties>;

export type MergedData = GeoJson<MergedFeature>;

function mergeGeojsonWithInflationsData(
    geojson: GeoJson<CountryFeature>,
    inflationsData: InflationsData,
): MergedData {
    const { data: countriesData, keys } = inflationsData.data;
    const { features } = geojson;

    const mergedData = features.map((feature) => {
        const countryIndex = keys[0].findIndex(
            (key) => key === feature.properties.ISO2,
        );

        const inflations = countryIndex === -1 ? [] : countriesData[countryIndex];

        return {
            ...feature,
            properties: {
                ...feature.properties,
                inflations,
            },
        };
    });

    return {
        ...geojson,
        features: mergedData,
    };
}

export function useEuropeMapWithInflationsData(euOnly = false) {
    const inflationsQuery = useInflationsData();
    const geojsonQuery = useEuropeGeojson(euOnly);

    let mergedData: MergedData | undefined;
    if (inflationsQuery.data && geojsonQuery.data) {
        mergedData = mergeGeojsonWithInflationsData(
            geojsonQuery.data,
            inflationsQuery.data,
        );
    }

    return {
        inflationsQuery,
        geojsonQuery,
        mergeGeojsonWithInflationsData: mergedData,
        isPending: inflationsQuery.isPending || geojsonQuery.isPending,
        isError: inflationsQuery.isError || geojsonQuery.isError,
    };
}
