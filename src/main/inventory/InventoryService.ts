import fs from "fs";
import path from "path";
import { InventoryItem } from "./InventoryDto";
import { GENERIC_ERRORS } from "../../GenericConstants";

export default class InventoryService {
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = path.join(process.cwd(), "src/test/mock-data/inventory.json");
  }

  parseInventory(): InventoryItem[] {
    let content: string;

    try {
      content = fs.readFileSync(this.filePath, "utf-8");
    } catch (err) {
      throw new Error(GENERIC_ERRORS.FILE_NOT_FOUND);
    }

    let data: any;
    try {
      data = JSON.parse(content);
    } catch (err) {
      throw new Error(GENERIC_ERRORS.INVALID_JSON);
    }

    return data
      .filter((entry: any) => entry.item && typeof entry.quantity === "number")
      .map((entry: any) => ({
        item: entry.item.trim(),
        quantity: entry.quantity,
      }));
  }
}
