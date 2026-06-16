"use client";

import { Button } from "@/components/ui/button";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { SkipForwardIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import SkipForm from "../forms/skip-movimentation/SkipMovimentationForm";

type SkipDepartamentDialogProps = {
  departamentState: DepartamentState;
  departamentStates: DepartamentState[];
  departamentDeadline: ProductionDeadlinePopulated | null;
};

export default function SkipDepartamentDialog({
  departamentState,
  departamentStates,
  departamentDeadline,
}: SkipDepartamentDialogProps) {
  return (
    <CustomDialog
      id={`skip-movimentation-${departamentState.departament.id}`}
      title="Pular departamento"
      trigger={
        <Button
          className="bg-gray-600 hover:bg-gray-800"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Pular
          <SkipForwardIcon />
        </Button>
      }
    >
      <SkipForm
        departamentState={departamentState}
        departamentStates={departamentStates}
        departamentDeadline={departamentDeadline}
      />
    </CustomDialog>
  );
}
