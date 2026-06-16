"use client";

import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { TrophyIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import FinishMetaForm from "@/components/calendar/weekly/forms/finish-meta/FinishGoalForm";

type FinishGoalDialogProps = {
  goalAmount: number;
  metaWeekDate: Date;
  departament: Departament;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  departamentAvaliableAmount: number;
};

export default function FinishGoalDialog({
  departamentStates,
  goalAmount,
  departament,
  metaWeekDate,
  deadline,
  departamentAvaliableAmount,
}: FinishGoalDialogProps) {
  return (
    <CustomDialog
      id={`finish-meta-${metaWeekDate.toISOString()}`}
      title="Concluir meta"
      trigger={
        <p className="hover:bg-muted/80 flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <TrophyIcon size={16} />
          Concluir meta
        </p>
      }
    >
      <FinishMetaForm
        departamentStates={departamentStates}
        goalAmount={goalAmount}
        departament={departament}
        metaWeekDate={metaWeekDate}
        deadline={deadline}
        departamentAvaliableAmount={departamentAvaliableAmount}
      />
    </CustomDialog>
  );
}
