import { Request, Response, Router } from "express";

import { requireAdminAuth } from "@/api/middlewares/admin-auth";
import { screenSequenceRepository } from "@/services/screen-sequences/screen-sequences.repository";

function paramFrom(param: string | string[] | undefined): string | undefined {
  return typeof param === "string"
    ? param
    : param !== undefined
      ? param[0]
      : undefined;
}

export function createScreenSequencesRouter() {
  const router = Router();

  router.get("/screen-sequences", async (_req: Request, res: Response) => {
    const screenSequences =
      await screenSequenceRepository.listScreenSequences();
    return res.json({ screenSequences });
  });

  router.get("/screen-sequences/:slug", async (req: Request, res: Response) => {
    const slug = paramFrom(req.params.slug);
    if (!slug) return res.status(400).json({ error: "Invalid slug." });

    const screenSequence = await screenSequenceRepository.getBySlug(slug);
    if (!screenSequence) {
      return res.status(404).json({ error: "Screen sequence not found." });
    }
    return res.json({ screenSequence });
  });

  router.get(
    "/screen-sequences/:slug/sequence/:seq",
    async (req: Request, res: Response) => {
      const slug = paramFrom(req.params.slug);
      const seqParam = paramFrom(req.params.seq);
      if (!slug) return res.status(400).json({ error: "Invalid slug." });
      if (seqParam === undefined) {
        return res.status(400).json({ error: "Invalid sequence." });
      }

      const sequence = Number(seqParam);
      if (!Number.isFinite(sequence)) {
        return res.status(400).json({ error: "Invalid sequence." });
      }

      try {
        const { plan, screen } =
          await screenSequenceRepository.getScreenBySequence(slug, sequence);

        if (!plan) {
          return res.status(404).json({ error: "Screen sequence not found." });
        }
        if (!screen) {
          return res.status(404).json({ error: "Screen not found." });
        }

        return res.json({ screen });
      } catch (error: any) {
        return res
          .status(400)
          .json({ error: error.message || "Unknown error." });
      }
    },
  );

  router.post(
    "/admin/screen-sequences",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const screenSequence =
          await screenSequenceRepository.createScreenSequence(req.body);
        return res.status(201).json({ screenSequence });
      } catch (error: any) {
        const message = error.message || "Unknown error.";
        const isDuplicate =
          typeof message === "string" && message.includes("already exists");
        return res.status(isDuplicate ? 409 : 400).json({ error: message });
      }
    },
  );

  router.put(
    "/admin/screen-sequences/:slug",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const slug = paramFrom(req.params.slug);
        if (!slug) return res.status(400).json({ error: "Invalid slug." });

        const screenSequence =
          await screenSequenceRepository.updateScreenSequence(slug, req.body);
        if (!screenSequence) {
          return res.status(404).json({ error: "Screen sequence not found." });
        }
        return res.json({ screenSequence });
      } catch (error: any) {
        const message = error.message || "Unknown error.";
        const isDuplicate =
          typeof message === "string" && message.includes("already exists");
        return res.status(isDuplicate ? 409 : 400).json({ error: message });
      }
    },
  );

  return router;
}
