import { CountryFeature, GeoJson } from "../../components/viz/types";
import { countries } from "../../features/Inflations/constants/countries";
import { jsonFetcher } from "./jsonFetcher";

const url =
    "https://raw.githubusercontent.com/leakyMirror/map-of-europe/refs/heads/master/GeoJSON/europe.geojson";

const tooFarCountries: string[] = []; // ["AZ", "AL", "AM", "SM", "IS", "IL", "RU", "GE", "TR", "UA"];

function filterOutTooFarCountries(features: CountryFeature[]) {
    return features.filter(
        (feature) => !tooFarCountries.includes(feature.properties.ISO2),
    );
}

function filterEUFeatures(features: CountryFeature[]) {
    return features.filter((feature) => countries.includes(feature.properties.ISO2));
}

async function fetcher(
    url: string,
    filter?: (features: CountryFeature[]) => CountryFeature[],
): Promise<GeoJson<CountryFeature>> {
    const data = (await jsonFetcher(url)) as GeoJson<CountryFeature>;

    if (filter !== undefined) {
        const filteredFeatures = filter(data.features);

        return { ...data, features: filteredFeatures };
    }

    return data;
}

export function europeGeoJsonFetcher(euOnly = false) {
    return fetcher(url, euOnly ? filterEUFeatures : filterOutTooFarCountries);
}
