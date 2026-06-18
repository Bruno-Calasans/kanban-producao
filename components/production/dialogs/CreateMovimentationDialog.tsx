"use client";

import { Button } from "@/components/ui/button";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { Play } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import CreateMovimentationForm from "../forms/create-movimentation-form/CreateMovimentationForm";

type CreateMovimentationDialogProps = {
  departamentState: DepartamentState;
  departamentDeadline: ProductionDeadlinePopulated;
};

export default function CreateMovimentationDialog({
  departamentState,
  departamentDeadline,
}: CreateMovimentationDialogProps) {
  return (
    <CustomDialog
      id={`create-movimentation-${departamentState.departament.id}`}
      title="Criar nova movimentação"
      trigger={
        <Button
          className="bg-indigo-400 hover:bg-indigo-500"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Avançar
          <Play />
        </Button>
      }
    >
      <CreateMovimentationForm
        departamentState={departamentState}
        departamentDeadline={departamentDeadline}
      />
    </CustomDialog>
  );
}
