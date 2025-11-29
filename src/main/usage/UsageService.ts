import fs from "fs";
import path from "path";
import {UsageItem} from "./UsageDto";

export default class UsageService {
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = path.join(process.cwd(), "src/test/mock-data/usage.csv");
  }

  parseUsage(): UsageItem[] {
    // Read CSV file as a UTF-8 string
    const content = fs.readFileSync(this.filePath, "utf-8");

    // Split file into lines and remove any empty lines
    const lines = content.split("\n").filter(line => line.trim() !== "");
    // console.log(lines);
    const dataLines = lines.slice(1);

    // item-quantity map
    const usageMap = new Map<string, number>();

    for (const line of dataLines) {
      const [food, quantityStr] = line.split(",");
      if (!food || !quantityStr) continue;
      const quantity = parseInt(quantityStr.trim(), 10);
      const current = usageMap.get(food.trim()) || 0;
      usageMap.set(food.trim(), current + quantity);
    }

    // Convert Map entries to list of UsageItem
    const result: UsageItem[] = Array.from(usageMap.entries()).map(
      ([food, quantity]) => ({ food, quantity })
    );

    return result;
  }
}
