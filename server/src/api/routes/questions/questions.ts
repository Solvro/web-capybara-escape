import { Request, Response, Router } from "express";

import { requireAdminAuth } from "@/api/middlewares/admin-auth";
import { questionRepository } from "@/services/questions/question.repository";

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

  /**
   * @swagger
   * /api/questions:
   *   get:
   *     summary: Pobierz listę pytań
   *     tags: [Questions]
   *     responses:
   *       200:
   *         description: Lista wszystkich pytań.
   */

  router.get("/questions", async (req: Request, res: Response) => {
    const questions = await questionRepository.listQuestions();
    return res.json({ questions });
  });

  /**
   * @swagger
   * /api/questions/{id}:
   *   get:
   *     summary: Pobierz szczegóły konkretnego pytania
   *     tags: [Questions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Dane pytania
   *       400:
   *         description: Nieprawidłowe ID
   *       404:
   *         description: Nie znaleziono pytania
   */

  router.get("/questions/:id", async (req: Request, res: Response) => {
    const id = idFromParams(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid ID." });

    const question = await questionRepository.getById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
    return res.json({ question });
  });

  /**
   * @swagger
   * /api/admin/questions:
   *   post:
   *     summary: Dodaj nowe pytanie
   *     tags: [Admin Questions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               content:
   *                 type: string
   *               options:
   *                 type: array
   *                 items:
   *                   type: string
   *               correctAnswer:
   *                 type: number
   *     responses:
   *       201:
   *         description: Pytanie utworzone pomyślnie
   *       400:
   *         description: Błąd walidacji
   */

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

  /**
   * @swagger
   * /api/admin/questions/{id}:
   *   put:
   *     summary: Zaktualizuj istniejące pytanie
   *     tags: [Admin Questions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: Pytanie zaktualizowane
   *       400:
   *         description: Błąd walidacji lub nieprawidłowe ID
   *       404:
   *         description: Nie znaleziono pytania
   */

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

  /**
   * @swagger
   * /api/admin/questions/{id}:
   *   delete:
   *     summary: Usuń pytanie
   *     tags: [Admin Questions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Pytanie usunięte pomyślnie
   *       400:
   *         description: Nieprawidłowe ID
   *       404:
   *         description: Nie znaleziono pytania
   */

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
