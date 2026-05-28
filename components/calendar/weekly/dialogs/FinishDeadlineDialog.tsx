"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import FinishDeadlineForm from "@/components/calendar/weekly/forms/finish-deadline/FinishDeadlineForm";
import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { CheckIcon } from "lucide-react";

type FinishDeadlineDialogProps = {
  deadline: MovimentationDeadlinePopulated;
  processStates: ProcessState[];
};

export default function FinishDeadlineDialog({
  deadline,
  processStates,
}: FinishDeadlineDialogProps) {
  return (
    <CustomDialog
      id={`finish-deadline-${deadline.id}`}
      title="Finalizar prazo"
      trigger={
        <p className="flex hover:bg-muted cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <CheckIcon size={16} />
          Concluir tudo
        </p>
      }
    >
      <FinishDeadlineForm deadline={deadline} processStates={processStates} />
    </CustomDialog>
  );
}
