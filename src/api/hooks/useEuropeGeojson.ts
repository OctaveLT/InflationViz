import { useQuery } from "@tanstack/react-query";
import { europeGeoJsonFetcher } from "../fetchers/europeGeoJsonFetcher";

export function useEuropeGeojson(euOnly = false) {
    const result = useQuery({
        queryKey: ["europeGeojson"],
        queryFn: async () => europeGeoJsonFetcher(euOnly),
    });

    return result;
}
