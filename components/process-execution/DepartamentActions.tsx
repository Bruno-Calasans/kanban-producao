"use client";

import { DepartamentState } from "@/types/database.type";
import CreateMovimentationDialog from "./dialogs/CreateMovimentationDialog";
import CreateReprocessExecutionDialog from "./dialogs/CreateReprocessExecutionDialog";
import MoveExternalProcessExecutionDialog from "./dialogs/ExternalDepartamentDialog";
import SkipDepartamentDialog from "./dialogs/SkipDepartamentDialog";

type DepartamentActionsProps = {
  departamentState: DepartamentState;
  departamentStates: DepartamentState[];
};

export default function DepartamentActions({
  departamentState,
  departamentStates,
}: DepartamentActionsProps) {
  const { previousDepartament, nextDepartament, production } = departamentState;

  const isLastDepartament = nextDepartament == null;
  const antiLastDepartament = departamentStates[departamentStates.length - 2];
  const isAntiLastDepartament =
    antiLastDepartament.departament.id === departamentState.departament.id;

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
        />
      )}

      {previousDepartament && (
        <CreateReprocessExecutionDialog
          departamentState={departamentState}
          departamentStates={departamentStates}
        />
      )}

      {nextDepartament && (
        <MoveExternalProcessExecutionDialog departamentState={departamentState} />
      )}
    </div>
  );
}
