import { BaseType, easeLinear, geoMercator, geoPath, select, transition } from "d3";
import { ChangeEvent, memo, MouseEvent, useEffect, useRef } from "react";
import { Country } from "../../../features/Inflations/constants/countries";
import { theme } from "../../../features/Inflations/constants/theme";
import { isInEU } from "../../../features/Inflations/functions/isInEU";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { useEuropeGeojson } from "../../../api/hooks/useEuropeGeojson";
import { Dimension } from "../../../types/dimensions/types";
import { Point } from "../../../types/shapes/types";
import { Loader } from "../../ui/Loader/Loader";
import { CountryFeature } from "../types";

export type EuropeMapProps = {
    euOnly?: boolean;
    dimension: Dimension;
    highlightedCountry: Country;
    onCountryChange: (country: Country) => void;
    hoveredCountry?: Country | null;
    onMouseOver?: (point: Point, country: Country) => void;
    onMouseLeave?: () => void;
    chloroplethConfig?: {
        data: Record<Country, number>;
        colorScale: (value: number) => string;
    };
    style?: React.CSSProperties;
};

const defaultColor = "lightgrey";

function getChloroplethColor(
    chloroplethConfig: EuropeMapProps["chloroplethConfig"],
    feature: CountryFeature,
) {
    const { data, colorScale } = chloroplethConfig ?? {};

    if (!data || !colorScale) return defaultColor;

    const value = data[feature.properties.ISO2];

    return value ? colorScale(value) : defaultColor;
}

export function EuropeMap({
    euOnly,
    dimension,
    highlightedCountry,
    onCountryChange,
    hoveredCountry,
    onMouseOver,
    onMouseLeave,
    chloroplethConfig,
    style,
}: EuropeMapProps) {
    const { data, isError, isPending } = useEuropeGeojson(false);

    const divRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const { width, height } = dimension;
    const { margin } = getInnerDimension(dimension);

    const fast = transition().ease(easeLinear);

    useEffect(() => {
        if (!data || !data.features) return;

        const projection = geoMercator().fitExtent(
            [
                [margin.left, margin.top],
                [width - margin.left, height - margin.top],
            ],
            data,
        );

        const geoGenerator = geoPath().projection(projection);

        function isOutsideEu(feature: CountryFeature) {
            return euOnly && !isInEU(feature);
        }

        function isHighlighted(feature: CountryFeature) {
            return feature.properties.ISO2 === highlightedCountry;
        }

        function isHovered(feature: CountryFeature) {
            if (isOutsideEu(feature)) {
                return false;
            }

            return feature.properties.ISO2 === hoveredCountry;
        }

        const mapSelection = select(svgRef?.current).select("g.topography");

        function onClick(event: ChangeEvent, feature: CountryFeature) {
            event.stopPropagation();
            if (isOutsideEu(feature)) return;

            onCountryChange(feature.properties.ISO2);
        }

        function handleMouseOver(
            this: BaseType | SVGPathElement,
            event: MouseEvent<HTMLDivElement, MouseEvent>,
            feature: CountryFeature,
        ) {
            const hoveredCountry = feature.properties.ISO2;
            onMouseOver?.(
                {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    x: event.layerX,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    y: event.layerY,
                },
                hoveredCountry,
            );
        }

        function handleMouseLeave() {
            onMouseLeave?.();
        }

        function getFill(feature: CountryFeature) {
            return getChloroplethColor(chloroplethConfig, feature);
        }

        function getOpacity(feature: CountryFeature) {
            if (isOutsideEu(feature)) {
                return 0.2;
            }

            if (highlightedCountry === Country.U2) {
                return 1;
            }

            if (isHighlighted(feature) || isHovered(feature)) {
                return 1;
            }

            return 0.7;
        }

        function getStroke(feature: CountryFeature) {
            if (isHighlighted(feature) || isHovered(feature)) {
                return theme.border.colors.primary;
            }

            return theme.background.secondary;
        }

        function getCursor(feature: CountryFeature) {
            if (isOutsideEu(feature)) {
                return "auto";
            }

            return "pointer";
        }

        mapSelection
            .selectAll("path")
            .data(data.features)
            .join(
                (enter) => enter.append("path").attr("fill", getFill),
                (update) => update.attr("fill", getFill),
                (exit) => exit.remove(),
            )
            .attr("d", geoGenerator)
            .attr("class", "country")
            .style("opacity", getOpacity)
            .style("stroke", getStroke)
            .style("stroke-width", 1)
            .style("cursor", getCursor)
            .on("mousemove", handleMouseOver)
            .on("mouseleave", handleMouseLeave)
            .on("click", onClick);
    }, [
        chloroplethConfig,
        data,
        euOnly,
        fast,
        height,
        highlightedCountry,
        hoveredCountry,
        margin.left,
        margin.top,
        onCountryChange,
        onMouseLeave,
        onMouseOver,
        svgRef,
        width,
    ]);

    const isLoading = isPending || isError;

    return (
        <div
            ref={divRef}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...style,
            }}
            onClick={() => onCountryChange(Country.U2)}
        >
            {isLoading ? (
                <Loader
                    style={{
                        height,
                        width,
                    }}
                />
            ) : (
                <svg
                    ref={svgRef}
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                >
                    <g
                        className="topography"
                        transform={`translate(${margin.left},${margin.top})`}
                    />
                </svg>
            )}
        </div>
    );
}

export const MemoizedEuropeMap = memo(EuropeMap);
