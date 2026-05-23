import { MovimentationPopulated, MovimentationStatus, ProcessState } from "@/types/database.type";

type UseMovimentationStatusProps = {
  movimentation: MovimentationPopulated;
  processStates: ProcessState[];
};

export default function calcMovimentationStatus({
  movimentation,
  processStates,
}: UseMovimentationStatusProps): MovimentationStatus {
  if (movimentation.status === "CANCELLED") {
    return "CANCELLED";
  }

  if (processStates.every((s) => s.status === "PENDING")) {
    return "PENDING";
  }

  if (processStates.some((s) => s.status === "REPROCESSING")) {
    return "REPROCESSING";
  }

  if (processStates.some((s) => s.status === "IN_PROGRESS" || s.status === "EXTERNAL")) {
    return "IN_PROGRESS";
  }

  return "COMPLETED";
}
