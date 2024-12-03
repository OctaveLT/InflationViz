import { useQuery } from "@tanstack/react-query";
import { json } from "d3";
import { InflationsData } from "../../features/Inflations/types/data";

// @ts-ignore
const BASE_URL = import.meta.env.BASE_URL

const url = BASE_URL + "data/inflations.json";

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
