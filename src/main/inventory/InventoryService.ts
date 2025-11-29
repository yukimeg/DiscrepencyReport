import fs from "fs";
import path from "path";
import {InventoryItem} from "./InventoryDto";
import {GENERIC_ERRORS} from "../../GenericConstants";

export default class InventoryService {
  private filePath: string;

  constructor(filePath?: string) {
    // Always sets filePath to the mock inventory.json inside test folder.
    // The passed-in filePath argument is ignored for now. TODO: can consume from req
    this.filePath = path.join(process.cwd(), "src/test/mock-data/inventory.json");
  }

  parseInventory(): InventoryItem[] {
    let content: string;

    try {
      content = fs.readFileSync(this.filePath, "utf-8"); // UTF-8 decoded string from inventory.json
    } catch (err) {
      throw new Error(GENERIC_ERRORS.FILE_NOT_FOUND);
    }

    let data: any;
    try {
      data = JSON.parse(content);
    } catch (err) {
      throw new Error(GENERIC_ERRORS.INVALID_JSON);
    }

    // Return only valid entries:
    return data
      .filter((entry: any) => entry.item && typeof entry.quantity === "number")
      .map((entry: any) => ({
        item: entry.item.trim(),
        quantity: entry.quantity,
      }));
  }
}
