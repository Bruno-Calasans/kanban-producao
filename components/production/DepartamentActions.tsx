"use client";

import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import CreateMovimentationDialog from "./dialogs/CreateMovimentationDialog";
import CreateReprocessExecutionDialog from "./dialogs/CreateReprocessExecutionDialog";
import ExternalDepartamentDialog from "./dialogs/ExternalDepartamentDialog";
import SkipDepartamentDialog from "./dialogs/SkipDepartamentDialog";

type DepartamentActionsProps = {
  departamentState: DepartamentState;
  departamentStates: DepartamentState[];
  deadlines: ProductionDeadlinePopulated[];
};

export default function DepartamentActions({
  departamentState,
  departamentStates,
  deadlines,
}: DepartamentActionsProps) {
  const { departament, previousDepartament, nextDepartament, production } = departamentState;

  const isLastDepartament = nextDepartament == null;
  const antiLastDepartament = departamentStates[departamentStates.length - 2];
  const isAntiLastDepartament =
    antiLastDepartament.departament.id === departamentState.departament.id;

  const departamentDeadline =
    deadlines.find((deadline) => deadline.departament.id == departament.id) || null;

  if (departamentState.avaliableAmount == 0) return null;

  if (production.status == "CANCELLED") return null;

  if (production.status == "COMPLETED" && !isLastDepartament) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {nextDepartament && <CreateMovimentationDialog departamentState={departamentState} />}

      {nextDepartament && !isAntiLastDepartament && (
        <SkipDepartamentDialog
          departamentState={departamentState}
          departamentStates={departamentStates}
          departamentDeadline={departamentDeadline}
        />
      )}

      {previousDepartament && (
        <CreateReprocessExecutionDialog
          departamentState={departamentState}
          departamentStates={departamentStates}
          departamentDeadline={departamentDeadline}
        />
      )}

      {nextDepartament && (
        <ExternalDepartamentDialog
          departamentState={departamentState}
          departamentDeadline={departamentDeadline}
        />
      )}
    </div>
  );
}
