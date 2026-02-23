import { type, Schema, MapSchema } from "@colyseus/schema";
import { Position } from "./Position";

export class Button extends Schema {
  @type("string") id: string;
  @type(Position) position: Position = new Position();
  @type("boolean") pressed: boolean = false;
  @type("string") color: string;
  @type("string") doorId: string;
}

export class ButtonState extends Schema {
  @type({ map: Button }) buttons = new MapSchema<Button>();
  @type({ map: "string" }) positionMap = new MapSchema<string>(); // key: "x_y", value: buttonId

  createButton(
    id: string,
    color: string,
    x: number,
    y: number,
    doorId: string
  ): Button {
    const button = new Button();
    button.id = id;
    button.color = color;
    button.position.x = x;
    button.position.y = y;
    button.doorId = doorId;
    button.pressed = false;
    this.buttons.set(id, button);
    this.positionMap.set(`${x}_${y}`, id);
    return button;
  }

  getButtonAt(x: number, y: number): Button | undefined {
    const buttonId = this.positionMap.get(`${x}_${y}`);
    return buttonId ? this.buttons.get(buttonId) : undefined;
  }

  removeButton(id: string) {
    const button = this.buttons.get(id);
    if (button) {
      this.positionMap.delete(`${button.position.x}_${button.position.y}`);
      this.buttons.delete(id);
    }
  }

  onRoomDispose() {
    this.buttons.clear();
    this.positionMap.clear();
  }
}
