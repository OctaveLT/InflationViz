import { ExtendedFeature } from "d3";
import { Country } from "../../features/Inflations/types/data";

export type CountryProperties = {
    ISO2: Country;
    NAME: string;
    AREA: number;
    POP2005: number;
    LAT: number;
    LON: number;
};

export type CountryGeometry = GeoJSON.MultiPolygon | GeoJSON.Polygon;

export type CountryFeature = ExtendedFeature<CountryGeometry, CountryProperties>;

export type GeoJson<Feature> = {
    type: "FeatureCollection";
    features: Feature[];
};
