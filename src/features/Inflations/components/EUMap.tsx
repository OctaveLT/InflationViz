import { useState } from "react";
import { EuropeMap, EuropeMapProps } from "../../../components/viz/Map/EuropeMap";
import { TooltipPosition } from "../../../components/viz/Tooltip/Tooltip";
import { Dimension } from "../../../types/dimensions/types";
import { theme } from "../constants/theme";
import { CountryTooltip } from "./CountryTooltip";
import { Country } from "../constants/countries";
import { DateShort } from "../../../types/generics/dates";
import { CountrySelect } from "./CountrySelect";

type EUMapProps = Omit<
    EuropeMapProps,
    "euOnly" | "style" | "dimension" | "onMouseOver" | "onMouseLeave"
> & {
    lastDate: DateShort;
    gridArea: string;
};

const dimension: Dimension = {
    height: 400,
    width: 400,
    margin: {
        bottom: 10,
        left: 10,
        right: 100,
        top: 10,
    },
};

export function EUMap({
    gridArea,
    lastDate,
    highlightedCountry,
    onCountryChange,
    ...restProps
}: EUMapProps) {
    const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(
        null,
    );

    function handleMouseOver(point: TooltipPosition, country: Country) {
        setHoveredCountry(country);
        setTooltipPosition(point);
    }

    function handleMouseLeave() {
        setHoveredCountry(null);
        setTooltipPosition(null);
    }

    const formattedDate = new Date(lastDate).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    return (
        <div
            style={{
                gridArea,
                position: "relative",
                ...theme.card,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
            }}
        >
            <div
                style={{
                    width: "80%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <CountrySelect
                    value={highlightedCountry}
                    onChange={onCountryChange}
                />
                <h3>{formattedDate}</h3>
            </div>
            <EuropeMap
                {...restProps}
                highlightedCountry={highlightedCountry}
                onCountryChange={onCountryChange}
                hoveredCountry={hoveredCountry}
                euOnly={true}
                dimension={dimension}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                style={{ height: "100%" }}
            />
            <CountryTooltip
                position={tooltipPosition}
                dimension={dimension}
                hoveredCountry={hoveredCountry}
            />
        </div>
    );
}
