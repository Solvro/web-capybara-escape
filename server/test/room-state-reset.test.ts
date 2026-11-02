import assert from "assert";

import fallbackRoom from "@/static/levels/default.json";

import { RoomState } from "../src/rooms/schemas/room-state";

function findCrateWithFreeTileBehind(state: RoomState) {
  const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];

  for (const crate of state.crateState.crates.values()) {
    if (crate.isSteel) continue;
    for (const { dx, dy } of directions) {
      const tx = crate.position.x + dx;
      const ty = crate.position.y + dy;
      if (state.isWalkableForCrate(tx, ty)) {
        return { crate, tx, ty, dx, dy };
      }
    }
  }
  return null;
}

describe("RoomState level reset", () => {
  it("does not leave tiles blocked by crates that were pushed before the reset", () => {
    const state = new RoomState();
    state.loadRoomFromJson(fallbackRoom);
    state.spawnNewPlayer("session-1", "tester", "sol");

    const move = findCrateWithFreeTileBehind(state);
    assert.ok(move, "level has a crate that can be pushed");

    state.moveCrate(move.crate.id, move.dx, move.dy);
    assert.ok(state.crateState.getCrateAt(move.tx, move.ty));

    state.loadRoomFromJson(fallbackRoom);

    assert.ok(
      state.isWalkableForPlayer(move.tx, move.ty),
      `tile ${move.tx},${move.ty} should be walkable again after the reset`,
    );
    assert.strictEqual(state.crateState.getCrateAt(move.tx, move.ty), null);
  });

  it("restores crates to their original positions after the reset", () => {
    const state = new RoomState();
    state.loadRoomFromJson(fallbackRoom);

    const originalPositions = Array.from(state.crateState.crates.values())
      .map((crate) => `${crate.position.x}_${crate.position.y}`)
      .sort();

    const move = findCrateWithFreeTileBehind(state);
    assert.ok(move);
    state.moveCrate(move.crate.id, move.dx, move.dy);

    state.loadRoomFromJson(fallbackRoom);

    const positionsAfterReset = Array.from(state.crateState.crates.values())
      .map((crate) => `${crate.position.x}_${crate.position.y}`)
      .sort();
    assert.deepStrictEqual(positionsAfterReset, originalPositions);

    for (const crate of state.crateState.crates.values()) {
      assert.strictEqual(
        state.crateState.getCrateAt(crate.position.x, crate.position.y),
        crate,
      );
    }
  });
});
