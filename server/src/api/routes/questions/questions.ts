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
   *     summary: Get question list
   *     tags: [Questions]
   *     responses:
   *       200:
   *         description: List of all the questions
   *         content:
   *           application/json:
   *             example:
   *               questions:
   *                 - id: "q-123"
   *                   question:
   *                     title: "Do you like capybaras?"
   *                     options:
   *                       - text: "Yes"
   *                         endResult: "friend"
   *                       - text: "No"
   *                         nextQuestion:
   *                           title: "Are you sure?"
   *                           options:
   *                             - text: "Yes, I'm sure"
   *                               endResult: "enemy"
   *                   createdAt: "2026-09-10T21:42:00.000Z"
   *                   updatedAt: "2026-09-10T21:46:00.000Z"
   */

  router.get("/questions", async (req: Request, res: Response) => {
    const questions = await questionRepository.listQuestions();
    return res.json({ questions });
  });

  /**
   * @swagger
   * /api/questions/{id}:
   *   get:
   *     summary: Get details of a given question
   *     tags: [Questions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Question details
   *         content:
   *           application/json:
   *             example:
   *               question:
   *                 id: "q-123"
   *                 question:
   *                   title: "Do you like capybaras?"
   *                   options:
   *                     - text: "Yes"
   *                       endResult: "friend"
   *                 createdAt: "2026-09-10T20:00:00.000Z"
   *                 updatedAt: "2026-09-10T21:00:00.000Z"
   *       400:
   *         description: Invalid ID
   *         content:
   *           application/json:
   *             example:
   *               error: "Invalid ID."
   *       404:
   *         description: No question found
   *         content:
   *           application/json:
   *             example:
   *               error: "Question not found."
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
   *     summary: Add new question
   *     tags: [Admin Questions]
   *     security:
   *       - AdminToken: []
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
   *         description: Question created successfully
   *         content:
   *           application/json:
   *             example:
   *               question:
   *                 id: "q-456"
   *                 question:
   *                   title: "Is this a new node?"
   *                   options:
   *                     - text: "Yes"
   *                       endResult: "win"
   *                 createdAt: "2026-09-10T21:44:00.000Z"
   *                 updatedAt: "2026-09-10T21:45:00.000Z"
   *       400:
   *         description: Validation error
   *         content:
   *           application/json:
   *             example:
   *               error: "Unknown error."
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
   *     summary: Update a pre-existing question
   *     tags: [Admin Questions]
   *     security:
   *       - AdminToken: []
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
   *         description: Question updated
   *         content:
   *           application/json:
   *             example:
   *               question:
   *                 id: "q-123"
   *                 question:
   *                   title: "Updated question title?"
   *                   options:
   *                     - text: "Updated option"
   *                       endResult: "loss"
   *                 createdAt: "2026-09-10T20:00:00.000Z"
   *                 updatedAt: "2026-09-10T21:45:00.000Z"
   *       400:
   *         description: Validation error or Invalid ID
   *         content:
   *           application/json:
   *             example:
   *               error: "Invalid ID."
   *       404:
   *         description: No question found
   *         content:
   *           application/json:
   *             example:
   *               error: "Question not found."
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
   *     summary: Delete question
   *     tags: [Admin Questions]
   *     security:
   *       - AdminToken: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Question deleted successfully
   *       400:
   *         description: Invalid ID
   *         content:
   *           application/json:
   *             example:
   *               error: "Invalid ID."
   *       404:
   *         description: No question found
   *         content:
   *           application/json:
   *             example:
   *               error: "Question not found."
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
