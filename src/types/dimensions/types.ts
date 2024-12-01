export type Margin = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};

export type Dimension = {
    width: number;
    height: number;
    margin: Partial<Margin>;
};

export type InnerDimension = {
    innerWidth: number;
    innerHeight: number;
    margin: Margin;
};
