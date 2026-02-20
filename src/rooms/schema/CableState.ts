import {type, Schema, MapSchema} from "@colyseus/schema";
import {Position} from "./Position";
import type { Direction} from "../../shared/utils/vectorUtils";
import { getDirectionFromMoveVector } from "../../shared/utils/vectorUtils";

export class Cable extends Schema{
    @type("string") id: string;
    @type(Position) position: Position;
    
    @type("boolean") damage: boolean = false;
    @type("number") damageDuration: number;
    @type("number") safeDuration: number;
    @type("number") timer: number;
    
}

export class CableState extends Schema{
    @type({map: Cable})
    cables = new MapSchema<Cable>();

    private toggledCableIds = new Set<string>();
    private usedIds = new Set<number>()
    private nextAvailableId: number = 0;
    
    private positionToCableId = new Map<string, string>()
    private movedCableIds = new Set<string>();
    private movedCableDirections = new Map<string, Direction>();
     
    
    private getPositionKey(x: number, y: number): string {
        return `${x}_${y}`;
    }
    createCable(x: number, y: number, damageMs: number = 3000, safeMs: number = 2000, startDamaging: boolean = true): Cable {
        const id = this.nextAvailableId++;
        this.usedIds.add(id);

        const cable = new Cable();
        cable.id = id.toString();
        cable.position = new Position();
        cable.position.x = x;
        cable.position.y = y;

        cable.damageDuration = damageMs;
        cable.safeDuration = safeMs;
        cable.damage = startDamaging;
        cable.timer = startDamaging ? damageMs : safeMs;

        this.cables.set(cable.id, cable);

        const key = this.getPositionKey(x, y);
        this.positionToCableId.set(key, cable.id);

        return cable;
    }
    setCableState(id: string, damage: boolean){
        const cable = this.cables.get(id);
        if (!cable) return;
        if (cable.damage === damage) return;

        cable.damage = damage;
        cable.timer = damage ? cable.damageDuration : cable.safeDuration;

        // record toggle so room can broadcast update
        this.toggledCableIds.add(id);
    }

    doesDamageOrNotAt(x: number, y: number): boolean{
        for (const [, cable] of this.cables){
            if (cable.position.x === x && cable.position.y === y) {
                return cable.damage;
            }
        }
        return false;
    }

    removeCable(id: string) {
        const cable = this.cables.get(id);
        if (!cable) return;

        const key = this.getPositionKey(cable.position.x, cable.position.y);
        this.positionToCableId.delete(key);

        this.cables.delete(id);
    }
    onRoomDispose() {
        this.cables.clear();
        this.usedIds.clear();
        this.toggledCableIds.clear();
        this.positionToCableId.clear();
        this.movedCableIds.clear();
        this.movedCableDirections.clear();
    }
    
    getCableAt(x: number, y: number){
        const key = this.getPositionKey(x, y);
        const cableId = this.positionToCableId.get(key);
        return cableId ? this.cables.get(cableId) : null;
    }
    moveCableIndex(
        cable: Cable,
        oldX: number,
        oldY: number,
        dx: number,
        dy: number
    ){
        const oldKey = this.getPositionKey(oldX, oldY);
        this.positionToCableId.delete(oldKey);

        this.movedCableIds.add(cable.id);
        this.movedCableDirections.set(cable.id, getDirectionFromMoveVector(dx, dy));

        const newKey = this.getPositionKey(oldX + dx, oldY + dy);
        this.positionToCableId.set(newKey, cable.id);
    }

    moveCablesBlock(
        oldX: number,
        oldY: number,
        targetX: number,
        targetY: number,
        dx: number,
        dy: number
    ): boolean {
        while (oldX !== targetX || oldY !== targetY) {
            targetX -= dx;
            targetY -= dy;
            const cable = this.getCableAt(targetX, targetY);
            if (!cable) return false;
            this.moveCableIndex(cable, targetX, targetY, dx, dy);
        }
        return true;
    }
    getAndClearMovedCables(): { cableId: string; direction: Direction }[]{
        const movedCables: { cableId: string; direction: Direction }[] = [];
        this.movedCableIds.forEach((cableId) => {
            const cableDirection = this.movedCableDirections.get(cableId);
            if (cableDirection){
                movedCables.push({
                    cableId: cableId,
                    direction: cableDirection,
                });
            }
        });
        this.movedCableIds.clear();
        this.movedCableDirections.clear();
        return movedCables;
    }

    // returns array of toggled cables with useful info and clears internal set
    getAndClearToggledCables(): {
        cableId: string;
        damage: boolean;
        x: number;
        y: number;
        timer: number;
    }[] {
        const toggled: any[] = [];
        this.toggledCableIds.forEach((id) => {
            const cable = this.cables.get(id);
            if (cable) {
                toggled.push({
                    cableId: id,
                    damage: cable.damage,
                    x: cable.position.x,
                    y: cable.position.y,
                    timer: cable.timer,
                });
            }
        });
        this.toggledCableIds.clear();
        return toggled;
    }

    timerMethod(deltaMs: number){
        if(deltaMs <= 0) return;
        for (const [, cable] of this.cables){
            if(!Number.isFinite(cable.timer) || cable.timer <= 0){
                cable.timer = cable.damage ? cable.damageDuration : cable.safeDuration;
            }
            cable.timer -= deltaMs;
            while (cable.timer <= 0){
                // toggle state and record toggle for broadcast
                cable.damage = !cable.damage;
                this.toggledCableIds.add(cable.id);
                cable.timer += cable.damage ?  cable.damageDuration : cable.safeDuration;
            }
        }
    }
}