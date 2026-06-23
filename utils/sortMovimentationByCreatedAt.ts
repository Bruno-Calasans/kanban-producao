import { MovimentationPopulated } from "@/types/database.type";
import { startOfDay } from "date-fns";

export default function sortMovimentationByCreatedAt(movimentations: MovimentationPopulated[]) {
  return movimentations.sort((movA, movB) => {
    return movA.id - movB.id;
  });
}
