"use client";

import { CalendarCheckIcon } from "lucide-react";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import CustomDialog from "@/components/custom/CustomDialog";
import FinishDeadlineForm from "@/components/calendar/weekly/forms/finish-deadline/FinishDeadlineForm";

type FinishDeadlineDialogProps = {
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  departamentAvaliableAmount: number;
};

export default function FinishDeadlineDialog({
  deadline,
  departamentStates,
  departamentAvaliableAmount,
}: FinishDeadlineDialogProps) {
  return (
    <CustomDialog
      id={`finish-deadline-${deadline.id}`}
      title="Concluir prazo"
      description="Conclui prazo e move toda quantidade para o próximo departamento"
      trigger={
        <p className="flex hover:bg-muted cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <CalendarCheckIcon size={16} />
          Concluir prazo
        </p>
      }
    >
      <FinishDeadlineForm
        deadline={deadline}
        departamentStates={departamentStates}
        departamentAvaliableAmount={departamentAvaliableAmount}
      />
    </CustomDialog>
  );
}
