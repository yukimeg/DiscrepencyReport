export type ReconcileItem = {
  item: string;
  expected: number;
  actual?: number;
  discrepancy?: number;
  status: "OK" | "DISCREPANCY" | "UNKNOWN";
}
