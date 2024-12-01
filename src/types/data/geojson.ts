import { GeoPermissibleObjects } from "d3";
import { CountryFeature } from "../../components/viz/types";

export type GeoJsonFeature = {
    type: "Feature";
    geometry: {
        type: "MultiPoint";
        coordinates: number[][];
    };
    properties: unknown;
};

export type GeoJson2<Feature extends GeoPermissibleObjects = CountryFeature> = {
    type: "FeatureCollection";
    features: Feature[];
};
