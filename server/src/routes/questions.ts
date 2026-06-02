import { Request, Response, Router } from "express";

import { requireAdminAuth } from "../middleware/adminAuth";
import { questionRepository } from "../questions/question.repository";

function idFromParams(
  param: string | string[] | undefined,
): string | undefined {
  return typeof param === "string"
    ? param
    : param !== undefined
      ? param[0]
      : undefined;
}

export function createQuestionsRouter() {
  const router = Router();

  router.get("/questions", async (req: Request, res: Response) => {
    const questions = await questionRepository.listQuestions();
    return res.json({ questions });
  });

  router.get("/questions/:id", async (req: Request, res: Response) => {
    const id = idFromParams(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid ID." });

    const question = await questionRepository.getById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
    return res.json({ question });
  });

  router.post(
    "/admin/questions",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const question = await questionRepository.createQuestion(req.body);
        return res.status(201).json({ question });
      } catch (error: any) {
        return res
          .status(400)
          .json({ error: error.message || "Unknown error." });
      }
    },
  );

  router.put(
    "/admin/questions/:id",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const id = idFromParams(req.params.id);
        if (!id) return res.status(400).json({ error: "Invalid ID." });

        const question = await questionRepository.updateQuestion(id, req.body);
        if (!question) {
          return res.status(404).json({ error: "Question not found." });
        }
        return res.json({ question });
      } catch (error: any) {
        return res
          .status(400)
          .json({ error: error.message || "Unknown error." });
      }
    },
  );

  router.delete(
    "/admin/questions/:id",
    requireAdminAuth,
    async (req: Request, res: Response) => {
      try {
        const id = idFromParams(req.params.id);
        if (!id) return res.status(400).json({ error: "Invalid ID." });

        const success = await questionRepository.deleteQuestion(id);
        if (!success) {
          return res.status(404).json({ error: "Question not found." });
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
