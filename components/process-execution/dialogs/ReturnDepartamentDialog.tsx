"use client";

import { Button } from "@/components/ui/button";
import { MoveDownLeftIcon } from "lucide-react";
import { ExternalDepartamentState } from "@/utils/calcDepartamentExternalState";
import { Departament } from "@/types/database.type";
import CustomDialog from "@/components/custom/CustomDialog";
import ReturnProcessForm from "../forms/return-form/ReturnDepartamentForm";

type ReturnDepartamentDialogProps = {
  externalProcessState: ExternalDepartamentState;
  avaliableDepartaments: Departament[];
};

export default function ReturnDepartamentDialog({
  externalProcessState,
  avaliableDepartaments,
}: ReturnDepartamentDialogProps) {
  return (
    <CustomDialog
      id={`return-movimentation-${externalProcessState.departament.id}`}
      title="Retornar produtos"
      trigger={
        <Button
          className="bg-indigo-400 hover:bg-indigo-500"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Retornar
          <MoveDownLeftIcon />
        </Button>
      }
    >
      <ReturnProcessForm
        avaliableDepartaments={avaliableDepartaments}
        externalDepartamentState={externalProcessState}
      />
    </CustomDialog>
  );
}
