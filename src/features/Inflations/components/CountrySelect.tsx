import { Select } from "../../../components/ui/Select/Select";
import { countries, Country } from "../constants/countries";
import { useCountryProperties } from "../hooks/useCountryProperties";

type CountrySelectProps = {
    value: Country;
    onChange: (country: Country) => void;
};

export function CountrySelect({ value, onChange }: CountrySelectProps) {
    const getProperties = useCountryProperties();

    function getOptionLabel(option: Country) {
        const { data: properties } = getProperties(option);
        if (properties == null) return option;

        return properties.NAME;
    }

    const sortedCountriesByAlphabeticalOrder = countries.sort((a, b) =>
        getOptionLabel(a).localeCompare(getOptionLabel(b)),
    );

    return (
        <Select
            value={value}
            onChange={onChange}
            options={sortedCountriesByAlphabeticalOrder}
            getOptionLabel={getOptionLabel}
        />
    );
}
