import UsageService from "./UsageService";
import { UsageItem } from "./UsageDto";
import { GENERIC_ERRORS } from "../../GenericConstants";

export default class UsageController {
  private service: UsageService;

  constructor() {
    this.service = new UsageService();
  }

  parseUsage(): { ok: boolean; data: UsageItem[]; message?: string } {
    try {
      const data = this.service.parseUsage();
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
