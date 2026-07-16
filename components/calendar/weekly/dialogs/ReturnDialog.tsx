"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { MoveDownLeftIcon } from "lucide-react";
import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import ReturnProcessForm from "@/components/production/forms/return-form/ReturnDepartamentForm";

type ReturnDialogProps = {
  externalDepartamentState: DepartamentState;
  avaliableDepartaments: Departament[];
  deadline?: ProductionDeadlinePopulated;
};

export default function ReturnDialog({
  externalDepartamentState,
  avaliableDepartaments,
  deadline,
}: ReturnDialogProps) {
  return (
    <CustomDialog
      id={`return-movimentation-${externalDepartamentState.departament.id}`}
      title="Retornar produtos"
      trigger={
        <p className="hover:bg-muted/80 flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <MoveDownLeftIcon size={16} />
          Retornar
        </p>
      }
    >
      <ReturnProcessForm
        avaliableDepartaments={avaliableDepartaments}
        externalDepartamentState={externalDepartamentState}
        deadline={deadline}
      />
    </CustomDialog>
  );
}
