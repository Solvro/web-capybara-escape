import { RoomState } from "../schemas/room-state";

export class CollisionHandler {
  public checkHazardCollision(
    position: { x: number; y: number },
    roomState: RoomState,
  ): boolean {
    const { x, y } = position;

    const hitEnemy = [...roomState.enemyState.enemies.values()].some((enemy) =>
      enemy.isAtPosition(x, y),
    );
    if (hitEnemy) return true;

    if (roomState.cableState.doesDamageOrNotAt(x, y)) {
      return true;
    }

    if (roomState.laserState.isPointInLaserBeam(x, y)) {
      return true;
    }

    return false;
  }

  public checkPlayerCollision(
    playerPos: { x: number; y: number },
    roomState: RoomState,
  ): boolean {
    return this.checkHazardCollision(playerPos, roomState);
  }
}
