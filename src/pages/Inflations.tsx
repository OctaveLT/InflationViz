import { Body } from "../features/Inflations/components/Body";
import { Footer } from "../features/Inflations/components/Footer";
import { Header } from "../features/Inflations/components/Header";

export function Inflations() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                flex: "1 1 auto",
                overflowY: "auto",
            }}
        >
            <Header />
            <Body />
            <Footer />
        </div>
    );
}
