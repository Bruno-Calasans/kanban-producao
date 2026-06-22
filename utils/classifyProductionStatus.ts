import { ProductionPopulated } from "@/types/database.type";

export default function classifyProductionStatus({ status }: ProductionPopulated) {
  switch (status) {
    case "CANCELLED":
      return 0;
    case "IN_PROGRESS":
      return 1;
    case "PENDING":
      return 2;
    case "REPROCESSING":
      return 3;
    default:
      return 4;
  }
}
