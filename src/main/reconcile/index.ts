import {Router, Request, Response} from "express";
import ReconcileController from "./ReconcileController";
import DeliveryDetailsService from "../../main/delivery/DeliveryDetailsService";
import UsageService from "../../main/usage/UsageService";
import InventoryService from "../../main/inventory/InventoryService";

const reconcileRouter = Router();
const controller = new ReconcileController();

/**
 * GET /reconcile/report
 * Combines delivery, usage, and inventory to produce discrepancy report
 */
reconcileRouter.get("/report", (_req: Request, res: Response) => {
  const delivery = new DeliveryDetailsService().parseDelivery();
  const usage = new UsageService().parseUsage();
  const inventory = new InventoryService().parseInventory();

  const response = controller.generateReport(delivery, usage, inventory);
  res.json(response);
});

export default reconcileRouter;
