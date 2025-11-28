import express from "express";

import deliveryRouter from "./main/delivery";
import usageRouter from "./main/usage";
import inventoryRouter from "./main/inventory";
import reconcileRouter from "./main/reconcile";

const app = express();
app.use(express.json());

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use("/delivery", deliveryRouter);
app.use("/usage", usageRouter);
app.use("/inventory", inventoryRouter);
app.use("/reconcile", reconcileRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
