export interface Cable {
    cableId: string;
    x: number;
    y: number;
    
    damage: boolean;
    timer: number;
    damageDuration: number;
    safeDuration: number;
}