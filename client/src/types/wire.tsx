export interface Wire{
    wireId: string;
    x: number;
    y: number;
    direction?: "up" | "down" | "left" | "right";
}