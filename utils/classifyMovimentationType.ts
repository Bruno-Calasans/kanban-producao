import { MovimentationType } from "@/types/database.type";

export default function classifyMovimentationType(type: MovimentationType) {
  switch (type) {
    case "INIT":
      return 0;

    case "ADJUSTMENT":
      return 1;

    case "EXTERNAL":
      return 2;

    case "REPROCESS":
      return 3;

    case "RETURN":
      return 4;

    case "SKIP":
      return 5;

    default:
      return 6;
  }
}
