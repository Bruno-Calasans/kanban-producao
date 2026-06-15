"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import CreateMovimentationForm from "../forms/create-movimentation-form/CreateMovimentationForm";
import { DepartamentState } from "@/types/database.type";
import { Play } from "lucide-react";

type CreateMovimentationDialogProps = {
  departamentState: DepartamentState;
};

export default function CreateMovimentationDialog({
  departamentState,
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
      <CreateMovimentationForm departamentState={departamentState} />
    </CustomDialog>
  );
}
