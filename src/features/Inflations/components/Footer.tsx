import { MAIN } from "../../../lang/texts";

export function Footer() {
    return (
        <p style={{ alignSelf: "flex-start", padding: 10 }}>
            {MAIN.source.text}:{" "}
            <a href="https://data.ecb.europa.eu" target="_blank">
                {MAIN.source.label}
            </a>
        </p>
    );
}
