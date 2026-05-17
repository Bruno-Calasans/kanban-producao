"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Departament, MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import FinishMetaForm from "@/components/calendar/weekly/forms/finish-meta/FinishMetaForm";
import { TrophyIcon } from "lucide-react";

type FinishMetaDialogProps = {
  processStates: ProcessState[];
  departament: Departament;
  metaAmount: number;
  metaWeekDate: Date;
  deadline: MovimentationDeadlinePopulated;
  departamentAvaliableAmount: number;
};

export default function FinishMetaDialog({
  processStates,
  metaAmount,
  departament,
  metaWeekDate,
  deadline,
  departamentAvaliableAmount,
}: FinishMetaDialogProps) {
  return (
    <CustomDialog
      id="finish-meta"
      title="Concluir Meta"
      trigger={
        <p className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <TrophyIcon size={16} />
          Concluir Meta
        </p>
      }
    >
      <FinishMetaForm
        processStates={processStates}
        metaAmount={metaAmount}
        departament={departament}
        metaWeekDate={metaWeekDate}
        deadline={deadline}
        departamentAvaliableAmount={departamentAvaliableAmount}
      />
    </CustomDialog>
  );
}
