import { NextFunction, Request, Response } from "express";

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = process.env.ADMIN_API_TOKEN;

  if (!token) {
    return res.status(503).json({ error: "ADMIN_API_TOKEN is not configured." });
  }

  const authorization = req.header("authorization") ?? "";
  const bearerPrefix = "Bearer ";

  if (!authorization.startsWith(bearerPrefix)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const receivedToken = authorization.slice(bearerPrefix.length).trim();
  if (receivedToken !== token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  next();
}
