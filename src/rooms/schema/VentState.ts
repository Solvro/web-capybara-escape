import { Schema, MapSchema, type } from "@colyseus/schema";
import { Position } from "./Position";

export class Vent extends Schema {
    @type("number") id: number;
    @type(Position) position: Position = new Position();
    @type("boolean") open: boolean = false;
}

export class VentState extends Schema {
    @type( {map: Vent} )
    vents = new MapSchema<Vent>();

    private usedIDs = new Set<number>();
    private nextAvailableId: number = 0;

    private positionToVentId = new Map<string, string>();
    private getPositionKey(x: number, y: number) {
        return `${x}_${y}`;
    }

    createVent(x: number, y: number): Vent {
        const id = this.nextAvailableId++;
        this.usedIDs.add(id);

        const vent = new Vent();
        vent.id = id;
        vent.position = new Position();
        vent.position.x = x;
        vent.position.y = y;

        this.vents.set(vent.id.toString(), vent)
        const key = this.getPositionKey(x, y);
        this.positionToVentId.set(key, vent.id.toString())

        return vent
    }

    removeVent(id: string): void {
        const vent = this.vents.get(id);
        if (!vent) return;
        const key = this.getPositionKey(vent.position.x, vent.position.y);
        this.positionToVentId.delete(key);
        this.vents.delete(id);
    }

    onRoomDispose(): void {
        this.vents.clear();
        this.usedIDs.clear();
    }

    getVentAt(x: number, y: number): Vent | undefined {
        const key = this.getPositionKey(x, y);
        const ventId = this.positionToVentId.get(key);
        return ventId ? this.vents.get(ventId) : null;
    }

    openVent(ventId: number) : void {
        const vent = this.vents.get(ventId.toString());
        if (!vent) return;
        vent.open = true;
    }

    isOpenOrEmptyAt(x: number, y: number): boolean {
        const vent = this.getVentAt(x, y);
        if (vent) {
            return vent.open;
        }
        return true;
    }

    spawnInitialVents() {
        const vent1 = this.createVent(3, 4);
        const vent2 = this.createVent(5, 11);
        const vent3 = this.createVent(8, 2);

        this.openVent(vent1.id)
    }
    
}