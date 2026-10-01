import {
  type LoreDialogContent,
  formatLoreText,
  parseLoreDialog,
  stripLoreFormatting,
} from "@capybara/shared";
import type { Request, Response } from "express";
import type { Db } from "mongodb";
import assert from "node:assert/strict";

import { createLoreRouter } from "../src/api/routes/lore/lore";
import { LoreRepository } from "../src/services/lore/lore.repository";

const content: LoreDialogContent = {
  text: "Hej!",
  pose: "zdziwiona",
  answers: [{ text: "Tak" }, { text: "Nie" }],
};

describe("Lore dialogs", () => {
  it("validates YAML, supports pose (any string) and any number of answers", () => {
    // Dialog without pose
    assert.deepEqual(parseLoreDialog("text: Hej!\nanswers: []"), {
      text: "Hej!",
      answers: [],
    });

    // Dialog with flexible pose (no restricted enum)
    const withPose = parseLoreDialog(
      "pose: zdziwiona\ntext: Hej!\nanswers: []",
    );
    assert.deepEqual(withPose, {
      text: "Hej!",
      pose: "zdziwiona",
      answers: [],
    });

    const withBranch = parseLoreDialog(
      "text: Hej!\nanswers:\n  - text: Idziemy\n    next: brama",
    );
    assert.deepEqual(withBranch.answers, [{ text: "Idziemy", next: "brama" }]);

    // Invalid sources
    for (const source of [
      "null",
      "text: Hej!",
      "text: Hej!\nanswers: [1]",
      "text: Hej!\nanswers: ['']",
      "text: Hej!\npose: ''\nanswers: []",
      "text: Hej!\nanswers: []\ninitialVariables: {}",
      "text: Hej!\nanswers:\n  - text: Dalej\n    requires: {}",
      "text: Hej!\nanswers:\n  - text: Dalej\n    next: Niepoprawny Slug",
      "text: [",
    ]) {
      assert.throws(() => parseLoreDialog(source));
    }
  });

  it("formats colors and pauses", () => {
    const text = "Zwykły \\C[4]żółty\\C[0].\\.\\| Koniec.";
    const glyphs = formatLoreText(text);
    assert.equal(stripLoreFormatting(text), "Zwykły żółty. Koniec.");

    const coloredGlyph = glyphs.find((glyph) => glyph.text === "ż");
    assert.equal(coloredGlyph?.color, 4);

    const pauses = glyphs.filter((g) => g.pause > 0).map((g) => g.pause);
    assert.deepEqual(pauses, [250, 1000]);
  });

  it("imports idempotently, updates only with overwrite and strips storage fields", async () => {
    const documents = new Map<string, object>();
    const repository = new LoreRepository(
      async () =>
        ({
          collection: () => ({
            findOne: async ({ _id }: { _id: string }) =>
              documents.get(_id) ?? null,
            updateOne: async (
              { _id }: { _id: string },
              update: { $set?: object; $setOnInsert?: object },
            ) => {
              const exists = documents.has(_id);
              if (!exists || update.$set)
                documents.set(_id, {
                  _id,
                  ...(update.$set ?? update.$setOnInsert),
                });
              return { upsertedCount: exists ? 0 : 1 };
            },
          }),
        }) as unknown as Db,
    );
    assert.equal(await repository.importDialog("intro", content), "created");
    const changed = { ...content, text: "Nowy tekst" };
    assert.equal(await repository.importDialog("intro", changed), "skipped");
    assert.deepEqual(await repository.getBySlug("intro"), content);
    assert.equal(
      await repository.importDialog("intro", changed, true),
      "updated",
    );
    assert.deepEqual(await repository.getBySlug("intro"), changed);
    assert.equal(await repository.getBySlug("missing"), null);
    await assert.rejects(repository.importDialog("../invalid", content));
    await assert.rejects(
      new LoreRepository(async () => null).getBySlug("intro"),
    );
  });

  it("routes dialog requests and returns 404, 400 and 503", async () => {
    const router = createLoreRouter({
      getBySlug: async (slug: string) => {
        if (slug === "offline") throw new Error("Database offline");
        return slug === "intro" ? content : null;
      },
    });
    const request = (slug: string) =>
      new Promise<{ status: number; body: unknown }>((resolve, reject) => {
        let status = 200;
        const response = {
          status(value: number) {
            status = value;
            return this;
          },
          json(body: unknown) {
            resolve({ status, body });
            return this;
          },
        };
        router(
          { method: "GET", url: `/lore/${slug}`, headers: {} } as Request,
          response as Response,
          (error?: unknown) => reject(error ?? new Error("Route not found")),
        );
      });
    assert.deepEqual(await request("intro"), {
      status: 200,
      body: { dialog: content },
    });
    for (const [slug, status] of [
      ["missing", 404],
      ["INVALID", 400],
      ["offline", 503],
    ] as const) {
      assert.equal((await request(slug)).status, status);
    }
  });
});
