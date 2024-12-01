import { Numeric, extent } from "./d3";

const DEFAULT_MIN_MAX: [Numeric, Numeric] = [0, 100]

/**
 * Return the min and max simultaneously with a default value
 */
export const getMinMax = <T, U extends Numeric>(
    iterable: Iterable<T>,
    accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null,
    defaultValues?: [U, U],
): [U, U] => {
    const minMax = extent(iterable, accessor)

    if (minMax?.[0] == null || minMax?.[1] == null) return defaultValues ?? DEFAULT_MIN_MAX as [U, U];

    return minMax as [U, U];
};