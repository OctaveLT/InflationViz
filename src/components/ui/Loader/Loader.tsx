import { LoaderIcon } from "./LoaderIcon";

type LoaderProps = {
    style?: React.CSSProperties;
};

export function Loader({ style }: LoaderProps) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...style,
            }}
        >
            <LoaderIcon />
        </div>
    );
}
