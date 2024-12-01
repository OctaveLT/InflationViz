import { useCallback, useState } from "react";
import { useInflationsData } from "../api/hooks/useInflationsData";
import { Tiles } from "../features/Inflations/components/Tiles";
import { Country } from "../features/Inflations/constants/countries";
import { theme } from "../features/Inflations/constants/theme";

const defaultCountryKey: Country = Country.BE;

export function Inflations() {
    const { data: inflationsData } = useInflationsData();
    // const [isStopped, setIsStopped] = useState(true);

    const [countryKey, setCountryKey] = useState(defaultCountryKey);

    const handleCountryChange = useCallback((country: Country) => {
        setCountryKey(country);
    }, []);

    if (inflationsData === undefined) return null;

    // const isEnd = tempData.length === inflationsData.data.keys[1].length;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
            }}
        >
            <h3
                style={{
                    alignSelf: "flex-start",
                    margin: 10,
                    color: theme.typography.primary,
                }}
            >
                Inflation rate in the EU
            </h3>
            {/*   <div
                style={{
                    display: "flex",
                    justifyContent: "column",
                    alignItems: "center",
                    columnGap: 10,
                }}
            > */}
            {/* <button onClick={() => setTempData([])}>Restart</button>
                <button onClick={() => setIsStopped((prev) => !prev)}>
                    {isStopped || isEnd ? "Continue" : "Stop"}
                </button> */}
            {/* <CountrySelect value={countryKey} onChange={handleCountryChange} /> */}
            {/* </div> */}
            <Tiles countryKey={countryKey} onCountryChange={handleCountryChange} />
            <p style={{ alignSelf: "flex-start", padding: 10 }}>
                Source:{" "}
                <a href="https://data.ecb.europa.eu">European Central Bank</a>
            </p>
        </div>
    );
}
