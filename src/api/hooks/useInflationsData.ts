import { useQuery } from "@tanstack/react-query";
import { json } from "d3";
import { InflationsData } from "../../features/Inflations/types/data";

const url = "/data/inflations.json";

function fetcher() {
    return json<InflationsData>(url);
}

export const useInflationsData = () => {
    const result = useQuery({
        queryKey: ["inflations"],
        queryFn: fetcher,
    });

    return result;
};
