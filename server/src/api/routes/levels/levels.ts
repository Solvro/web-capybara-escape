import { Request, Response, Router } from "express";

import { requireAdminAuth } from "@/api/middlewares/admin-auth";
import { levelRepository } from "@/services/levels/level.repository";

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

  router.get("/levels", async (req: Request, res: Response) => {
    const publishedOnly = !isAdminRequest(req);
    const levels = await levelRepository.listLevels({ publishedOnly });

    return res.json({ levels: levels.map(toLevelSummary) });
  });

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
        return res.status(400).json({ error: toErrorMessage(error) });
      }
    },
  );

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
