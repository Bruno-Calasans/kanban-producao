import { DepartamentState, ProductionPopulated, ProductionStatus } from "@/types/database.type";

type UseMovimentationStatusProps = {
  production: ProductionPopulated;
  departamentStates: DepartamentState[];
};

export function calcProductionStatus({
  production,
  departamentStates,
}: UseMovimentationStatusProps): ProductionStatus {
  if (production.status === "CANCELLED") {
    return "CANCELLED";
  }

  if (departamentStates.every((s) => s.status === "PENDING")) {
    return "PENDING";
  }

  if (departamentStates.some((s) => s.status === "REPROCESSING")) {
    return "REPROCESSING";
  }

  if (departamentStates.some((s) => s.status === "IN_PROGRESS" || s.status === "EXTERNAL")) {
    return "IN_PROGRESS";
  }

  return "COMPLETED";
}
