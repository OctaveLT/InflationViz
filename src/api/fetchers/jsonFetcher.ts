export function jsonFetcher(url: string) {
    return fetch(url).then((response) => response.json());
}
