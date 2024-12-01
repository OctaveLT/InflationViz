import { CountryFeature } from "../../../components/viz/types";
import { countries } from "../constants/countries";

export function isInEU(feature: CountryFeature) {
    return countries.includes(feature.properties.ISO2);
}
