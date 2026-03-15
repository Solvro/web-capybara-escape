import {type, Schema, MapSchema} from "@colyseus/schema";
import { Position } from "./Position";


export class Wire extends Schema{
    @type("string") id: string;
    @type(Position) position: Position;
    @type("string") direction: string; 
}
export class WireState extends Schema{
    @type({map: Wire})
    wires = new MapSchema<Wire>();


    private usedIds = new Set<number>()
    private nextAvailableId: number = 0;
    private positionToWireId = new Map<string, string>()

    private getPositionKey(x: number, y:number): string {
        return `${x}_${y}`;
    }
    // accept optional `id` (string) from map JSON; if omitted, generate numeric id
    createWire(id: string | undefined, x: number, y: number, direction: string = "up") : Wire{
        let assignedId: string;
        if (typeof id === "string" && id.length > 0) {
            assignedId = id;
        } else {
            const numId = this.nextAvailableId++;
            this.usedIds.add(numId);
            assignedId = numId.toString();
        }

        const wire = new Wire();
        wire.id = assignedId;
         wire.position = new Position();
         wire.position.x = x;
         wire.position.y = y;
         wire.direction = direction;
 
         this.wires.set(wire.id, wire);
 
         const key = this.getPositionKey(x,y);
         this.positionToWireId.set(key, wire.id);
         
         return wire;
     }
    removeWire(id: string){
        const wire = this.wires.get(id);
        if (!wire) return;

        const key = this.getPositionKey(wire.position.x, wire.position.y);
        this.positionToWireId.delete(key);

        this.wires.delete(id);
    }
    onRoomDispose(){
        this.wires.clear();
        this.usedIds.clear();
        this.positionToWireId.clear();
    }
    getWireAt(x:number, y:number){
        const key = this.getPositionKey(x,y);
        const wireId = this.positionToWireId.get(key);
        return wireId ? this.wires.get(wireId) :null;
    }
}