"use client";

import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { TrophyIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import FinishGoalForm from "@/components/calendar/weekly/forms/finish-daily-goal/FinishGoalForm";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";

type FinishGoalDialogProps = {
  expectedGoalAmount: number;
  dailyGoalDate: Date;
  departament: Departament;
  departamentStates: DepartamentState[];
  deadlineState: DepartamentDeadlineState;
};

export default function FinishGoalDialog({
  departamentStates,
  departament,
  dailyGoalDate,
  deadlineState,
  expectedGoalAmount,
}: FinishGoalDialogProps) {
  return (
    <CustomDialog
      id={`finish-meta-${dailyGoalDate.toISOString()}`}
      title="Concluir meta"
      trigger={
        <p className="hover:bg-muted/80 flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <TrophyIcon size={16} />
          Concluir meta
        </p>
      }
    >
      <FinishGoalForm
        departamentStates={departamentStates}
        departament={departament}
        dailyGoalDate={dailyGoalDate}
        deadlineState={deadlineState}
        expectedGoalAmount={expectedGoalAmount}
      />
    </CustomDialog>
  );
}
