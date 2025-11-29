import {DeliveryItem} from "../../main/delivery/DeliveryDto";
import {UsageItem} from "../../main/usage/UsageDto";
import {InventoryItem} from "../../main/inventory/InventoryDto";
import {ReconcileItem} from "./ReconcileDto";

export default class ReconcileService {
  reconcile(
    delivery: DeliveryItem[],
    usage: UsageItem[],
    inventory: InventoryItem[]
  ): ReconcileItem[] {
    const result: ReconcileItem[] = [];

    // Convert usage to a map for fast lookup
    const usageMap = new Map<string, number>();
    for (const u of usage) {
      usageMap.set(u.food, u.quantity);
    }

    // Convert inventory to a map
    const inventoryMap = new Map<string, number>();
    for (const inv of inventory) {
      inventoryMap.set(inv.item, inv.quantity);
    }

    for (const d of delivery) {
      const usedQty = usageMap.get(d.item) || 0;
      const actualQty = inventoryMap.get(d.item);
      const expectedQty = d.quantity - usedQty;

      let status: "OK" | "DISCREPANCY" | "UNKNOWN" = "OK";
      let discrepancy: number | undefined = undefined;

      if (actualQty === undefined) {
        status = "UNKNOWN";
      } else if (actualQty !== expectedQty) {
        status = "DISCREPANCY";
        discrepancy = actualQty - expectedQty;
        console.log(status, discrepancy);
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
