import DeliveryDetailsService from "./DeliveryDetailsService";
import { DeliveryItem } from "./DeliveryDto";
import { GENERIC_ERRORS } from "../../GenericConstants";

export default class DeliveryController {
  private service: DeliveryDetailsService;

  constructor() {
    this.service = new DeliveryDetailsService();
  }

  parseDelivery(): { ok: boolean; data: DeliveryItem[]; message?: string } {
    try {
      const data = this.service.parseDelivery();
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
