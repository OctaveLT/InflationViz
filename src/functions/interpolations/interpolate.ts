export const interpolate = (type?: 'linear' | 'square') => {
    switch (type) {
        case 'square':
            return square;
    
        default:
            return linear;
    }
}

const linear = (x: number, y: number, t: number, coef1: number = 1, coef2: number = 1) => x * (1 - t) * coef1 + y * t * coef2;

const square = (x: number, y: number, t: number) => x * (1 - t) * (1 - t) + y * t * t;