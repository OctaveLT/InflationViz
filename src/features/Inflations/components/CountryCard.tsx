import { Loader } from "../../../components/ui/Loader/Loader";
import { formatNumber } from "../../../functions/numbers/formatNumber";
import { Country } from "../constants/countries";
import { inflationDomain } from "../constants/domains";
import { theme } from "../constants/theme";
import { createColorScale } from "../functions/colorScale";
import { useCountryProperties } from "../hooks/useCountryProperties";

type CountryCardProps = {
    gridArea: string;
    countryKey: Country;
    lastInflationRate: number | null;
    lastDate: string;
};

export function CountryCard({
    gridArea,
    countryKey,
    lastInflationRate,
}: CountryCardProps) {
    const getProperties = useCountryProperties();

    const { data, isPending, isError } = getProperties(countryKey);

    if (isPending) return <Loader style={{ height: 195 }} />;

    if (isError) return <Loader />;

    const colorScale = createColorScale(inflationDomain);

    const inflationRateColor = lastInflationRate
        ? colorScale(lastInflationRate)
        : theme.grey[5];

    const { NAME, POP2005, AREA, LAT, LON } = data;

    function formatWithDegree(value: number) {
        return `${formatNumber(value)}°`;
    }

    return (
        <div
            style={{
                gridArea,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                ...theme.card,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                }}
            >
                <h3>{NAME}</h3>
                <p>Population: {formatNumber(POP2005)}</p>
                <p>Area: {AREA === 0 ? "Unknown" : formatNumber(AREA)}</p>
                <p>Latitude: {formatWithDegree(LAT)}</p>
                <p>Longitude: {formatWithDegree(LON)}</p>
            </div>
            <h5
                style={{
                    fontSize: 50,
                    color: inflationRateColor,
                    margin: 50,
                }}
            >
                {`${lastInflationRate ?? "-"} %`}
            </h5>
        </div>
    );
}
