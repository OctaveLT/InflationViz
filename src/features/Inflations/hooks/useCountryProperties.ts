import { CountryFeature, CountryProperties } from "../../../components/viz/types";
import { useEuropeGeojson } from "../../../api/hooks/useEuropeGeojson";
import { countries, Country } from "../constants/countries";

type ReturnValue =
    | {
          data: undefined;
          isPending: true;
          isError: boolean;
      }
    | {
          data: undefined;
          isPending: boolean;
          isError: true;
      }
    | {
          data: CountryProperties;
          isPending: false;
          isError: false;
      };

function getU2Properties(features: CountryFeature[]) {
    const population = features.reduce((acc, feature) => {
        if (countries.includes(feature.properties.ISO2)) {
            acc += feature.properties.POP2005;
        }

        return acc;
    }, 0);

    const area = features.reduce((acc, feature) => {
        if (countries.includes(feature.properties.ISO2)) {
            acc += feature.properties.AREA;
        }

        return acc;
    }, 0);

    return {
        ISO2: Country.U2,
        NAME: "European Union",
        POP2005: population,
        AREA: area,
        LAT: 54.9,
        LON: 25.3167,
    };
}

export function useCountryProperties() {
    const { data, isPending, isError } = useEuropeGeojson();

    function getCountryProperties(countryKey: Country): ReturnValue {
        if (isPending) {
            return {
                data: undefined,
                isPending,
                isError,
            };
        }

        if (isError) {
            return { data: undefined, isPending, isError };
        }

        // The features doesnt have the EU, so we need to calculate it
        if (countryKey === Country.U2) {
            return {
                data: getU2Properties(data.features),
                isPending,
                isError,
            };
        }

        const feature = data?.features.find(
            (feature) => feature.properties.ISO2 === countryKey,
        );

        if (!feature) throw new Error("Country not found");

        return {
            data: feature.properties as CountryProperties,
            isPending,
            isError,
        };
    }

    return getCountryProperties;
}
