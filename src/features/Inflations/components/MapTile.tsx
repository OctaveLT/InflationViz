import { useState } from "react";
import { EuropeMap, EuropeMapProps } from "../../../components/viz/Map/EuropeMap";
import { TooltipPosition } from "../../../components/viz/Tooltip/Tooltip";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { Dimension } from "../../../types/dimensions/types";
import { DateShort } from "../../../types/generics/dates";
import { Country } from "../constants/countries";
import { theme } from "../constants/theme";
import { CountrySelect } from "./CountrySelect";
import { CountryTooltip } from "./CountryTooltip";

type MapTileProps = Omit<
    EuropeMapProps,
    "euOnly" | "style" | "dimension" | "onMouseOver" | "onMouseLeave"
> & {
    lastDate: DateShort;
    gridArea: string;
};

const margin: Dimension["margin"] = {
    bottom: 10,
    left: 10,
    right: 100,
    top: 10,
};

function useDimensions() {
    const breakpoint = useBreakpoint();

    if (breakpoint === "xs") {
        return {
            height: 400,
            width: 400,
            margin,
        };
    }

    if (breakpoint === "sm") {
        return {
            height: 400,
            width: 400,
            margin,
        };
    }

    if (breakpoint === "md") {
        return {
            height: 400,
            width: 400,
            margin,
        };
    }

    if (breakpoint === "lg") {
        return {
            height: 500,
            width: 500,
            margin,
        };
    }

    return {
        height: 700,
        width: 700,
        margin,
    };
}

export function MapTile({
    gridArea,
    lastDate,
    highlightedCountry,
    onCountryChange,
    ...restProps
}: MapTileProps) {
    const dimension = useDimensions();

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
                height: "100%",
                width: "100%",
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
