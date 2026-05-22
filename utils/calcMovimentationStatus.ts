import { MovimentationPopulated, MovimentationStatus, ProcessState } from "@/types/database.type";

type UseMovimentationStatusProps = {
  movimentation: MovimentationPopulated;
  processStates: ProcessState[];
};

export default function calcMovimentationStatus({
  movimentation,
  processStates,
}: UseMovimentationStatusProps): MovimentationStatus {
  if (movimentation.is_cancelled) {
    return "CANCELLED";
  }

  if (processStates.every((s) => s.status === "PENDING")) {
    return "PENDING";
  }

  if (processStates.some((s) => s.status === "REPROCESSING")) {
    return "REPROCESSING";
  }

  if (processStates.some((s) => s.status === "IN_PROGRESS")) {
    return "IN_PROGRESS";
  }

  return "COMPLETED";
}
