import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { differenceInDays, startOfDay } from "date-fns";
import daysDiffExceptSunday from "./daysDiffExceptSunday";

export type DeadlineStatus =
  | "NOT_DEFINED" // DEADLINE NÃO FOI CRIADA
  | "NOT_READY" // SEM QUANTIDADE DISPONÍVEL
  | "IN_PROGRESS" // QUANTIDADE DISPONÍVEL E NÃO EXPIROU
  | "EXPIRED" // QUANTIDADE DISPONÍVEL E EXPIROU
  | "COMPLETED" // DEADLINE CONCLÚIDA E SEM QUANTIDADE DISPONÍVEL
  | "REOPEN" // DEADLINE CONCLUÍDA COM QUANTIDADE DISPONÍVEL
  | "COMPLETED_EXPIRED"; // CONCLUÍDO COM ATRASO

type CalcDeadlineStatusProps = {
  deadline?: ProductionDeadlinePopulated;
  departamentState: DepartamentState;
};

export type DeadlineStatusData = {
  status: DeadlineStatus;
  expireDays: number;
  expireDaysAfterEnd: number;
};

export function calcDeadlineStatus({
  deadline,
  departamentState,
}: CalcDeadlineStatusProps): DeadlineStatusData {
  // Sem prazo
  let statusData: DeadlineStatusData = {
    status: "NOT_DEFINED",
    expireDays: 0,
    expireDaysAfterEnd: 0,
  };

  if (deadline) {
    const today = startOfDay(new Date());
    const hasInput = departamentState.inputAmount > 0;
    const hasWork = departamentState.avaliableAmount > 0;

    const plannedEndDate = deadline.planned_end_at
      ? startOfDay(new Date(deadline.planned_end_at))
      : null;

    const actualEndDate = deadline.actual_end_at
      ? startOfDay(new Date(deadline.actual_end_at))
      : null;

    // Quantos dias para expirar
    // Negativo = expirou
    // Positivo = não expirou
    const expireDays = plannedEndDate ? differenceInDays(plannedEndDate, today) : 0;

    // Verifica quantos dias terminou depois do prazo
    // Negativo = expirou com atraso
    // Positivo = expirou sem atraso
    const expireDaysAfterEnd =
      plannedEndDate && actualEndDate ? differenceInDays(plannedEndDate, actualEndDate) : 0;

    // Prazo não recebeu entrada e não tem nada disponível
    if (!hasInput && !hasWork) {
      statusData.status = "NOT_READY";
    }

    // Prazo não concluído
    if (plannedEndDate && !actualEndDate && hasWork) {
      statusData.status = expireDays < 0 ? "EXPIRED" : "IN_PROGRESS";
    }

    // Prazo concluído com quantidade disponível
    if (actualEndDate && hasWork) {
      statusData.status = "REOPEN";
    }

    // Prazo concluído com quantidade disponível, geralmente por reprocesso ou externo
    if (actualEndDate && !hasWork) {
      statusData.status = "COMPLETED";
    }

    // Prazo concluído com atraso
    if (actualEndDate && !hasWork && expireDaysAfterEnd < 0) {
      statusData.status = "COMPLETED_EXPIRED";
    }

    // Atualiza status data
    statusData = {
      ...statusData,
      expireDays,
      expireDaysAfterEnd,
    };
  }

  return statusData;
}
