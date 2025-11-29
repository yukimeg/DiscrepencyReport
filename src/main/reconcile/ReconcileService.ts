import { DeliveryItem } from "../../main/delivery/DeliveryDto";
import { UsageItem } from "../../main/usage/UsageDto";
import { InventoryItem } from "../../main/inventory/InventoryDto";
import { ReconcileItem } from "./ReconcileDto";

/**
 *
 * Compares delivery, usage and inventory data and produces a reconcile report.
 * For each delivery item it calculates:
 *  - expected: difference between delivered and used
 *  - actual: quantity found in inventory at the end of the week
 *  - discrepancy: difference of actual and expected
 *  - status: "OK" | "DISCREPANCY" | "UNKNOWN"
 *
 * The service also logs a clear message for every item that has a discrepancy.
 */
export default class ReconcileService {
  reconcile(
    delivery: DeliveryItem[],
    usage: UsageItem[],
    inventory: InventoryItem[]
  ): ReconcileItem[] {
    const result: ReconcileItem[] = [];

    // Build a fast lookup for usage (food -> total used)
    const usageMap = new Map<string, number>();
    for (const u of usage) {
      usageMap.set(u.food, u.quantity);
    }

    // map of item -> quantity
    const inventoryMap = new Map<string, number>();
    for (const inv of inventory) {
      inventoryMap.set(inv.item, inv.quantity);
    }

    // Reconcile each delivered item
    for (const d of delivery) {
      const usedQty = usageMap.get(d.item) || 0;
      const actualQty = inventoryMap.get(d.item); // may be undefined
      const expectedQty = d.quantity - usedQty;

      let status: "OK" | "DISCREPANCY" | "UNKNOWN" = "OK";
      let discrepancy: number | undefined = undefined;

      if (actualQty === undefined) {
        status = "UNKNOWN";
      } else if (actualQty !== expectedQty) {
        status = "DISCREPANCY";
        discrepancy = actualQty - expectedQty;

        // per-item discrepancy message
        console.log(
          `DISCREPANCY -> Item: ${d.item} | Expected: ${expectedQty} | Actual: ${actualQty} | Difference: ${discrepancy}`
        );
      }

      result.push({
        item: d.item,
        expected: expectedQty,
        actual: actualQty,
        discrepancy,
        status,
      });
    }

    return result;
  }
}
