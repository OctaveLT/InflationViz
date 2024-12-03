import { useCallback, useState } from "react";
import { useInflationsData } from "../../../api/hooks/useInflationsData";
import { Country } from "../constants/countries";
import { Tiles } from "./Tiles";

const defaultCountryKey: Country = Country.BE;

export function Body() {
    const { data: inflationsData } = useInflationsData();

    const [countryKey, setCountryKey] = useState(defaultCountryKey);

    const handleCountryChange = useCallback((country: Country) => {
        setCountryKey(country);
    }, []);

    if (inflationsData === undefined) return null;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Tiles countryKey={countryKey} onCountryChange={handleCountryChange} />
        </div>
    );
}
