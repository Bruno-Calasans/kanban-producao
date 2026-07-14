import { ProductionDeadlinePopulated } from "@/types/database.type";
import { DeadlineStatus } from "@/utils/calcDeadlineStatus";

type FinishedDeadlineMsgProps = {
  deadline: ProductionDeadlinePopulated;
  expireDaysAfterEnd: number;
  status: DeadlineStatus;
};

export default function FinishedDeadlineMsg({
  deadline,
  status,
  expireDaysAfterEnd,
}: FinishedDeadlineMsgProps) {
  if (!deadline) return null;

  return (
    <div>
      {deadline.actual_end_at && status == "COMPLETED" && (
        <p className="text-stone-800/70 self-start">
          Prazo concluído em: {new Date(deadline.actual_end_at).toLocaleDateString()}
        </p>
      )}

      {deadline.actual_end_at && status == "COMPLETED_EXPIRED" && (
        <p className="text-stone-800/70 self-start">
          Prazo concluído em: {new Date(deadline.actual_end_at).toLocaleDateString()} com{" "}
          {expireDaysAfterEnd} dia(s) de atraso
        </p>
      )}

      {deadline.actual_end_at && status == "REOPEN" && (
        <p className="text-stone-800/70 self-start">
          Prazo concluído em: {new Date(deadline.actual_end_at).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
