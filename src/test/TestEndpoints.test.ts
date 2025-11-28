import request from "supertest";
import express from "express";

import deliveryRouter from "../main/delivery";
import usageRouter from "../main/usage";
import inventoryRouter from "../main/inventory";
import reconcileRouter from "../main/reconcile";

const app = express();
app.use(express.json());
app.use("/delivery", deliveryRouter);
app.use("/usage", usageRouter);
app.use("/inventory", inventoryRouter);
app.use("/reconcile", reconcileRouter);

describe("Basic Endpoint Tests", () => {
  it("should parse delivery.txt", async () => {
    const res = await request(app).get("/delivery/parse");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should parse usage.csv", async () => {
    const res = await request(app).get("/usage/parse");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should parse inventory.json", async () => {
    const res = await request(app).get("/inventory/parse");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should generate reconcile report", async () => {
    const res = await request(app).get("/reconcile/report");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
