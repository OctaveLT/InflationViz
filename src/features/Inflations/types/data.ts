import { DateShort } from "../../../types/generics/dates";
import { countries } from "../constants/countries";

/**
 * EU country
 */
export type Country = (typeof countries)[number];

export type InflationsData = {
    data: {
        /** From 1996-01 */
        keys: [Country[], DateShort[]];
        /** By country (c) by date (d) -> (c*d) */
        data: (number | null)[][];
    };
};

export type LastRatesAndDate = {
    date: DateShort;
    rates: Record<Country, number>;
};
