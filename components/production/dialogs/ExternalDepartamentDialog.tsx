"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import MoveExternalForm from "@/components/production/forms/move-external-form/MoveExternalForm";

type ExternalDepartamentDialogProps = {
  departamentState: DepartamentState;
  departamentDeadline: ProductionDeadlinePopulated | null;
};

export default function ExternalDepartamentDialog({
  departamentState,
  departamentDeadline,
}: ExternalDepartamentDialogProps) {
  return (
    <CustomDialog
      id={`external-movimentation-${departamentState.departament.id}`}
      title="Mover para departamento externo"
      trigger={
        <Button
          className="bg-emerald-400 hover:bg-emerald-500"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Mover para fora
          <MoveUpRightIcon />
        </Button>
      }
    >
      <MoveExternalForm
        departamentState={departamentState}
        departamentDeadline={departamentDeadline}
      />
    </CustomDialog>
  );
}
