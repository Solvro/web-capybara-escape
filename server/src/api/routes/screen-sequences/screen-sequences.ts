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

  /**
   * @swagger
   * /api/screen-sequences:
   *   get:
   *     summary: Get list of screen sequences
   *     tags: [Screen Sequences]
   *     responses:
   *       200:
   *         description: List of screen sequences, newest first
   */

  router.get("/screen-sequences", async (_req: Request, res: Response) => {
    const screenSequences =
      await screenSequenceRepository.listScreenSequences();
    return res.json({ screenSequences });
  });

  /**
   * @swagger
   * /api/screen-sequences/{slug}:
   *   get:
   *     summary: Get details of the given screen sequence
   *     tags: [Screen Sequences]
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Screen sequence with its screens
   *       404:
   *         description: Screen sequence not found
   */

  router.get("/screen-sequences/:slug", async (req: Request, res: Response) => {
    const slug = paramFrom(req.params.slug);
    if (!slug) return res.status(400).json({ error: "Invalid slug." });

    const screenSequence = await screenSequenceRepository.getBySlug(slug);
    if (!screenSequence) {
      return res.status(404).json({ error: "Screen sequence not found." });
    }
    return res.json({ screenSequence });
  });

  /**
   * @swagger
   * /api/screen-sequences/{slug}/sequence/{seq}:
   *   get:
   *     summary: Get a single screen with its level (published only) or question
   *     tags: [Screen Sequences]
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: seq
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Screen with the level or question loaded
   *       400:
   *         description: Invalid slug or sequence, or the level or question is unavailable
   *       404:
   *         description: Screen sequence or screen not found
   */

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

  /**
   * @swagger
   * /api/admin/screen-sequences:
   *   post:
   *     summary: Create screen sequence
   *     tags: [Admin Screen Sequences]
   *     security:
   *       - AdminToken: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               slug:
   *                 type: string
   *               description:
   *                 type: string
   *               screens:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     sequence:
   *                       type: integer
   *                     type:
   *                       type: string
   *                       enum: [level, question]
   *                     levelSlug:
   *                       type: string
   *                     questionId:
   *                       type: string
   *           example:
   *             slug: "super-levels"
   *             description: "After Loading Screens added"
   *             screens:
   *               - sequence: 1
   *                 type: "level"
   *                 levelSlug: "Level 1"
   *               - sequence: 2
   *                 type: "level"
   *                 levelSlug: "Level 2"
   *     responses:
   *       201:
   *         description: Screen sequence created successfully
   *       400:
   *         description: Invalid data (e.g. duplicated sequence, unknown level or question)
   *       409:
   *         description: Screen sequence with this slug already exists
   */

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

  /**
   * @swagger
   * /api/admin/screen-sequences/{slug}:
   *   put:
   *     summary: Update screen sequence
   *     tags: [Admin Screen Sequences]
   *     security:
   *       - AdminToken: []
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               slug:
   *                 type: string
   *               description:
   *                 type: string
   *               screens:
   *                 type: array
   *                 description: Same items as in POST, replaces the whole list
   *                 items:
   *                   type: object
   *     responses:
   *       200:
   *         description: Screen sequence updated
   *       400:
   *         description: Invalid data
   *       404:
   *         description: Screen sequence not found
   *       409:
   *         description: Screen sequence with the new slug already exists
   */

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

  /**
   * @swagger
   * /api/admin/screen-sequences/{slug}:
   *   delete:
   *     summary: Delete screen sequence
   *     tags: [Admin Screen Sequences]
   *     security:
   *       - AdminToken: []
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Screen sequence deleted successfully
   *       404:
   *         description: Screen sequence not found
   */

  router.delete(
    "/admin/screen-sequences/:slug",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const slug = paramFrom(req.params.slug);
        if (!slug) return res.status(400).json({ error: "Invalid slug." });

        const success =
          await screenSequenceRepository.deleteScreenSequence(slug);
        if (!success) {
          return res.status(404).json({ error: "Screen sequence not found." });
        }
        return res.status(204).send();
      } catch (error: any) {
        return res
          .status(400)
          .json({ error: error.message || "Unknown error." });
      }
    },
  );

  return router;
}
