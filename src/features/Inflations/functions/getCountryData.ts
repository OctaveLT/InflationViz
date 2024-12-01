import { Country, countries } from "../constants/countries";
import { InflationsData } from "../types/data";

function getCountryIndex(country: Country | null) {
    if (country === null) return countries.length - 1;

    const index = countries.findIndex((_country) => _country === country);

    return index === -1 ? countries.length - 1 : index;
}

export function getCountryData(
    countriesData: InflationsData["data"]["data"] | undefined,
    countryKey: Country,
): (number | null)[] {
    if (countriesData === undefined) return [];

    const countryIndex = getCountryIndex(countryKey);
    const countryData = countriesData[countryIndex].map((d) =>
        d == null ? null : d,
    );

    return countryData;
}
