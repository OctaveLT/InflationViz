import { ArrowUpIcon } from "../../../components/ui/Icons/ArrowUpIcon";
import { Loader } from "../../../components/ui/Loader/Loader";
import { formatNumber } from "../../../functions/numbers/formatNumber";
import { COUNTRY_CARD } from "../../../lang/texts";
import { Country } from "../constants/countries";
import { theme } from "../constants/theme";
import { inflationColorScale } from "../functions/colorScale";
import { useCountryProperties } from "../hooks/useCountryProperties";
import { LastRatesAndDate } from "../types/data";

type CountryTileProps = {
    gridArea: string;
    countryKey: Country;
    lastRatesAndDate: LastRatesAndDate;
    inflationRatesSelection: (number | null)[];
};

export function CountryTile({
    gridArea,
    countryKey,
    lastRatesAndDate: { rates },
    inflationRatesSelection,
}: CountryTileProps) {
    const getProperties = useCountryProperties();

    const { data, isPending, isError } = getProperties(countryKey);

    if (isPending) return <Loader style={{ height: 195 }} />;

    if (isError) return <Loader />;

    const lastInflationRate = rates[countryKey];

    function getInflationTrend() {
        const beforeLast = inflationRatesSelection.slice(-2)[0];

        if (beforeLast === null) {
            return null;
        }

        if (lastInflationRate >= beforeLast) {
            return true;
        }

        return false;
    }

    const colorScale = inflationColorScale();

    const inflationRateColor = lastInflationRate
        ? colorScale(lastInflationRate)
        : theme.grey[5];

    const { NAME, POP2005, AREA, LAT, LON } = data;

    function formatWithDegree(value: number) {
        return `${formatNumber(value)}°`;
    }

    const formatArea = (value: number) => {
        return value === 0 ? "Unknown" : `${formatNumber(value)} km²`;
    };

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
                <p>
                    {COUNTRY_CARD.population}: {formatNumber(POP2005)}
                </p>
                <p>
                    {COUNTRY_CARD.area}: {formatArea(AREA)}
                </p>
                <p>
                    {COUNTRY_CARD.lat}: {formatWithDegree(LAT)}
                </p>
                <p>
                    {COUNTRY_CARD.lon}: {formatWithDegree(LON)}
                </p>
            </div>
            <h5
                style={{
                    fontSize: 50,
                    color: inflationRateColor,
                    margin: 50,
                }}
            >
                {`${lastInflationRate ?? "-"} %`}
                <ArrowUpIcon
                    style={{
                        marginLeft: 10,
                        width: "2rem",
                        height: "2rem",
                        transform: getInflationTrend()
                            ? undefined
                            : "rotate(180deg)",
                    }}
                />
            </h5>
        </div>
    );
}
