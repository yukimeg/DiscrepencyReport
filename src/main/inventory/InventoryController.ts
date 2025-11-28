import InventoryService from "./InventoryService";
import { InventoryItem } from "./InventoryDto";
import { GENERIC_ERRORS } from "../../GenericConstants";

export default class InventoryController {
  private service: InventoryService;

  constructor() {
    this.service = new InventoryService();
  }

  parseInventory(): { ok: boolean; data: InventoryItem[]; message?: string } {
    try {
      const data = this.service.parseInventory();
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
