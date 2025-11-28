import ReconcileService from "./ReconcileService";
import {DeliveryItem} from "../../main/delivery/DeliveryDto";
import {UsageItem} from "../../main/usage/UsageDto";
import {InventoryItem} from "../../main/inventory/InventoryDto";
import {ReconcileItem} from "./ReconcileDto";
import {GENERIC_ERRORS} from "../../GenericConstants";

export default class ReconcileController {
  private service: ReconcileService;

  constructor() {
    this.service = new ReconcileService();
  }

  generateReport(
    delivery: DeliveryItem[],
    usage: UsageItem[],
    inventory: InventoryItem[]
  ): { ok: boolean; data: ReconcileItem[]; message?: string } {
    try {
      const data = this.service.reconcile(delivery, usage, inventory);
      return { ok: true, data };
    } catch (err) {
      return {
        ok: false,
        data: [],
        message: err instanceof Error ? err.message : GENERIC_ERRORS.UNKNOWN_ERROR,
      }
    }
  }
}
