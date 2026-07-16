import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { differenceInDays, startOfDay } from "date-fns";

export enum DeadlineStatusEnum {
  EXPIRED,
  NOT_DEFINED,
  WAITING,
  REOPEN,
  IN_PROGRESS,
  COMPLETED,
  COMPLETED_EXPIRED,
}

export type DeadlineStatus =
  | "NOT_DEFINED" // DEADLINE NÃO FOI CRIADA
  | "WAITING" // SEM QUANTIDADE DISPONÍVEL
  | "IN_PROGRESS" // QUANTIDADE DISPONÍVEL E NÃO EXPIROU
  | "EXPIRED" // QUANTIDADE DISPONÍVEL E EXPIROU
  | "COMPLETED" // DEADLINE CONCLÚIDA E SEM QUANTIDADE DISPONÍVEL
  | "REOPEN" // DEADLINE CONCLUÍDA COM QUANTIDADE DISPONÍVEL
  | "COMPLETED_EXPIRED"; // CONCLUÍDO COM ATRASO E SEM QUANTIDADE DISPONÍVEL

type CalcDeadlineStatusProps = {
  deadline?: ProductionDeadlinePopulated;
  departamentState: DepartamentState;
};

export const DEFAULT_DEADLINE_STATUS: DeadlineStatusData = {
  status: "NOT_DEFINED",
  expireDays: 0,
  expireDaysAfterEnd: 0,
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
  let statusData = { ...DEFAULT_DEADLINE_STATUS };

  if (deadline) {
    const today = startOfDay(new Date());
    const hasInput = departamentState.inputAmount > 0;
    const hasWork = departamentState.avaliableAmount > 0;
    const hasreprocess = departamentState.flags?.hasReprocess;

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
    if (!hasWork && !hasInput) {
      statusData.status = "WAITING";
    }

    // Prazo não concluído e com atraso
    if (plannedEndDate && !actualEndDate && expireDays < 0) {
      statusData.status = "EXPIRED";
    }

    // Prazo não concluído e sem atraso
    if (plannedEndDate && !actualEndDate && hasWork && expireDays >= 0) {
      statusData.status = "IN_PROGRESS";
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
