import { Router, Request, Response } from "express";
import UsageController from "./UsageController";

const usageRouter = Router();
const controller = new UsageController();

/**
 * GET /usage/parse
 */
usageRouter.get("/parse", (_req: Request, res: Response) => {
  const response = controller.parseUsage();
  res.json(response);
});

export default usageRouter;
