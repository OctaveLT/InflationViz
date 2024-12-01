import { Tooltip, TooltipPosition } from "../../../components/viz/Tooltip/Tooltip";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";
import { Country } from "../constants/countries";
import { useCountryProperties } from "../hooks/useCountryProperties";

type CountryTooltipProps = {
    dimension: Dimension;
    position: TooltipPosition | null;
    hoveredCountry: Country | null;
};

export function CountryTooltip({
    dimension,
    position,
    hoveredCountry,
}: CountryTooltipProps) {
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const getProperties = useCountryProperties();

    if (hoveredCountry === null) return null;

    const { data, isPending, isError } = getProperties(hoveredCountry);

    if (isPending) return <div>Loading...</div>;

    if (isError) return <div>Error</div>;

    const { NAME } = data;

    return (
        <div
            style={{
                width: innerWidth,
                height: innerHeight,
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                marginLeft: margin.left,
                marginTop: margin.top,
            }}
        >
            <Tooltip position={position} dynamic dimension={dimension}>
                <div style={{ margin: 10 }}>
                    <p>{NAME}</p>
                </div>
            </Tooltip>
        </div>
    );
}
