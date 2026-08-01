import { RoomState } from "../schema/RoomState.js";

export class CollisionHandler {
  public checkPlayerCollision(
    playerPos: { x: number; y: number },
    roomState: RoomState,
  ): boolean {
    const { x, y } = playerPos;

    const hitEnemy = [...roomState.enemyState.enemies.values()].some(
      (enemy) => enemy.position.x === x && enemy.position.y === y,
    );
    if (hitEnemy) return true;

    if (roomState.cableState.doesDamageOrNotAt(x, y)) {
      return true;
    }

    const hitLaser = [...roomState.laserState.lasers.values()].some((laser) => {
      if (!laser.active) return false;

      return this.isPointInLaserBeam(laser, x, y);
    });
    if (hitLaser) return true;

    return false;
  }

  private isPointInLaserBeam(laser: any, x: number, y: number): boolean {
    let dx = 0;
    let dy = 0;

    switch (laser.direction) {
      case "up":
        dy = -1;
        break;
      case "down":
        dy = 1;
        break;
      case "left":
        dx = -1;
        break;
      case "right":
        dx = 1;
        break;
    }

    for (let i = 1; i <= laser.currentRange; i++) {
      const beamX = laser.position.x + dx * i;
      const beamY = laser.position.y + dy * i;

      if (beamX === x && beamY === y) {
        return true;
      }
    }

    return false;
  }
}
