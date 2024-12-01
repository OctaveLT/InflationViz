const mainTheme = {
    background: {
        // #f1f1f1
        main: "#efefef",
        secondary: "#ffffff",
        action: "#f1f1f1",
    }, //"#c6e7f6",
    typography: {
        primary: "#073444",
        secondary: "#f9f9f9",
    },
    border: {
        primary: "1px solid #073444",
        secondary: "1px solid #f9f9f9",
        colors: {
            primary: "#073444",
            secondary: "#f9f9f9",
        },
        borderRadius: {
            primary: 5,
            secondary: 10,
        },
    },
    boxShadow: ["6px 8px 24px -4px rgba(149,157,165,0.2)"],
    grey: [
        "#f9f9f9",
        "#e0e0e0",
        "#c6c6c6",
        "#adadad",
        "#939393",
        "#7a7a7a",
        "#606060",
        "#474747",
        "white",
        "#141414",
    ],
};

const cardTheme = {
    background: mainTheme.background.secondary,
    borderRadius: mainTheme.border.borderRadius.primary,
    boxShadow: mainTheme.boxShadow[0],
};

export const theme = {
    ...mainTheme,
    card: cardTheme,
};
