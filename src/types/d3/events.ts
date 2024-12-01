export type ZoomEvent = {
    transform: {
        x: number;
        y: number;
        k: number;
    };
};

export type DragEvent = {
    dx: number;
    dy: number;
};
