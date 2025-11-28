import {Router, Request, Response} from "express";
import DeliveryController from "./DeliveryController";

const deliveryRouter = Router();
const controller = new DeliveryController();

/**
 * GET /delivery/parse
 */
deliveryRouter.get("/parse", (req: Request, res: Response) => {
  const response = controller.parseDelivery();
  res.json(response);
});

export default deliveryRouter;
