import { Router } from "express";

import { loreRepository } from "../../../services/lore/lore.repository";

export function createLoreRouter(
  repository: Pick<typeof loreRepository, "getBySlug"> = loreRepository,
) {
  const router = Router();
  router.get("/lore/:slug", async (req, res) => {
    const slug = req.params.slug;
    if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return res.status(400).json({ error: "Invalid dialog slug." });
    }
    try {
      const dialog = await repository.getBySlug(slug);
      if (!dialog) return res.status(404).json({ error: "Dialog not found." });
      return res.json({ dialog });
    } catch {
      return res.status(503).json({ error: "Dialog storage is unavailable." });
    }
  });
  return router;
}
