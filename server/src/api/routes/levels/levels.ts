import { Request, Response, Router } from "express";

import { requireAdminAuth } from "@/api/middlewares/admin-auth";
import { levelRepository } from "@/services/levels/level.repository";

//TODO change lang to eng
// add responses
//add the rest of the fields of model

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     AdminToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Paste here your ADMIN_API_TOKEN from .env
 *
 */

type ApiError = {
  message?: string;
};

function toErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    return (error as ApiError).message ?? "Unknown error.";
  }

  return "Unknown error.";
}

function isAdminRequest(req: Request): boolean {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return false;
  const authorization = req.header("authorization") ?? "";
  return authorization === `Bearer ${token}`;
}

function toLevelSummary(level: {
  slug: string;
  name: string;
  description?: string;
  isPublished: boolean;
  version: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    slug: level.slug,
    name: level.name,
    description: level.description,
    isPublished: level.isPublished,
    version: level.version,
    createdBy: level.createdBy,
    updatedBy: level.updatedBy,
    createdAt: level.createdAt,
    updatedAt: level.updatedAt,
  };
}

function slugFromParams(
  param: string | string[] | undefined,
): string | undefined {
  return typeof param === "string"
    ? param
    : param !== undefined
      ? param[0]
      : undefined;
}

export function createLevelsRouter() {
  const router = Router();

  /**
   * @swagger
   * /api/levels:
   *   get:
   *     summary: Get list of levels
   *     tags: [Levels]
   *     responses:
   *       200:
   *         description: List of levels ( returns all for admin, only published for the players)
   */

  router.get("/levels", async (req: Request, res: Response) => {
    const publishedOnly = !isAdminRequest(req);
    const levels = await levelRepository.listLevels({ publishedOnly });

    return res.json({ levels: levels.map(toLevelSummary) });
  });

  /**
   * @swagger
   * /api/levels/{slug}:
   *   get:
   *     summary: Get details of the given level
   *     tags: [Levels]
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Full level details
   *       404:
   *         description: No level found
   */

  router.get("/levels/:slug", async (req: Request, res: Response) => {
    const slug = slugFromParams(req.params.slug);
    if (slug === undefined) {
      return res.status(400).json({ error: "Invalid slug." });
    }
    const publishedOnly = !isAdminRequest(req);
    const level = await levelRepository.getBySlug(slug, {
      publishedOnly,
    });

    if (!level) {
      return res.status(404).json({ error: "Level not found." });
    }

    return res.json({ level });
  });

  /**
   * @swagger
   * /api/admin/levels:
   *   post:
   *     summary: Add new level
   *     tags: [Admin Levels]
   *     security:
   *       - AdminToken: []
   *     parameters:
   *       - in: header
   *         name: x-admin-user
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
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Level created successfully
   *       400:
   *         description: Validation error
   *       409:
   *         description: A level with this slug already exists
   */

  router.post(
    "/admin/levels",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const level = await levelRepository.createLevel({
          ...req.body,
          createdBy: req.header("x-admin-user") ?? "admin",
        });

        return res.status(201).json({ level });
      } catch (error: unknown) {
        const message = toErrorMessage(error);
        const isDuplicate =
          typeof message === "string" && message.includes("already exists");
        return res.status(isDuplicate ? 409 : 400).json({ error: message });
      }
    },
  );

  /**
   * @swagger
   * /api/admin/levels/{slug}:
   *   put:
   *     summary: Overwrite a pre-existing level
   *     tags: [Admin Levels]
   *     security:
   *       - AdminToken: []
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *       - in: header
   *         name: x-admin-user
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Level updated
   *       400:
   *         description: Invalid data
   *       404:
   *         description: Level not found
   */

  router.put(
    "/admin/levels/:slug",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const slug = slugFromParams(req.params.slug);
        if (slug === undefined) {
          return res.status(400).json({ error: "Invalid slug." });
        }
        const level = await levelRepository.updateLevel(slug, {
          ...req.body,
          updatedBy: req.header("x-admin-user") ?? "admin",
        });

        if (!level) {
          return res.status(404).json({ error: "Level not found." });
        }

        return res.json({ level });
      } catch (error: unknown) {
        return res.status(400).json({ error: toErrorMessage(error) });
      }
    },
  );

  /**
   * @swagger
   * /api/admin/levels/{slug}/publish:
   *   post:
   *     summary: Publish the level
   *     tags: [Admin Levels]
   *     security:
   *       - AdminToken: []
   *     parameters:
   *       - in: path
   *         name: slug
   *         required: true
   *         schema:
   *           type: string
   *       - in: header
   *         name: x-admin-user
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Level published
   *       400:
   *         description: Invalid slug
   *       404:
   *         description: Level not found
   */

  router.post(
    "/admin/levels/:slug/publish",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      const slug = slugFromParams(req.params.slug);
      if (slug === undefined) {
        return res.status(400).json({ error: "Invalid slug." });
      }
      const level = await levelRepository.updateLevel(slug, {
        isPublished: true,
        updatedBy: req.header("x-admin-user") ?? "admin",
      });

      if (!level) {
        return res.status(404).json({ error: "Level not found." });
      }

      return res.json({ level });
    },
  );

  return router;
}
