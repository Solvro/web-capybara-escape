import { RoomState } from "../schemas/room-state";

export class CollisionHandler {
  public checkPlayerCollision(
    playerPos: { x: number; y: number },
    roomState: RoomState,
  ): boolean {
    const { x, y } = playerPos;

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
}
