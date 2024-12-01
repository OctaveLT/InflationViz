import { theme } from "./features/Inflations/constants/theme";

type LayoutProps = {
    children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: theme.background.main,
                color: theme.typography.primary,
            }}
        >
            {children}
        </div>
    );
}
