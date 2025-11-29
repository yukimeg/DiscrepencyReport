import fs from "fs";
import path from "path";
import {DeliveryItem} from "./DeliveryDto";

export default class DeliveryDetailsService {
  private filePath: string;

  constructor() {
    // absolute path relative to project root
    this.filePath = path.join(process.cwd(), "src/test/mock-data/delivery.txt");
  }

  parseDelivery(): DeliveryItem[] {
    const content = fs.readFileSync(this.filePath, "utf-8");
        
    // Split file by line breaks and remove any empty lines.
    const lines = content.split("\n").filter(line => line.trim() !== "");

    return lines
      .map(line => {
        const [key, rawValue] = line.split("="); // split "itemName = quantity"
        if (!key) return null;
        const quantity = rawValue ? parseInt(rawValue.replace(/["']/g, "").trim(), 10) : 0;
        return { item: key.trim(), quantity };
      })
      .filter((item): item is DeliveryItem => item !== null);
  }
}
