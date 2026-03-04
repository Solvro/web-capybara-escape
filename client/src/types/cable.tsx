export interface Cable {
    cableId: string;
    x: number;
    y: number;
    
    damage: boolean;
    timer: number;
    direction?: "up" | "down" | "left" | "right";
    damageDuration: number;
    safeDuration: number;
}