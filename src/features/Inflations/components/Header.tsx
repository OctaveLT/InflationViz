import { MAIN } from "../../../lang/texts";
import { InfoButton } from "./InfoButton";

export function Header() {
    return (
        <div
            style={{
                width: "calc(100% - 20px)",
                margin: 10,
                display: "flex",
                justifyContent: "space-between",
                columnGap: 10,
            }}
        >
            <h3 style={{ margin: 0 }}>{MAIN.title}</h3>
            <h2 style={{ margin: 0 }}>{MAIN.subtitle}</h2>
            <InfoButton />
        </div>
    );
}
