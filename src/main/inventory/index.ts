import { Router, Request, Response } from "express";
import InventoryController from "./InventoryController";

const inventoryRouter = Router();
const controller = new InventoryController();

/**
 * GET /inventory/parse
 */
inventoryRouter.get("/parse", (_req: Request, res: Response) => {
  const response = controller.parseInventory();
  res.json(response);
});

export default inventoryRouter;
