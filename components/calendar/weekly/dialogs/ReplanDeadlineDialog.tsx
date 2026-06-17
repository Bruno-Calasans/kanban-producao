"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import ReplanDeadlineForm from "../forms/replan-deadline/ReplanDeadlineForm";
import { Departament, ProductionDeadlinePopulated } from "@/types/database.type";
import { CalendarSyncIcon } from "lucide-react";

type ReplanDeadlineDialogProps = {
  deadline: ProductionDeadlinePopulated;
  departament: Departament;
  departamentAvaliableAmount: number;
};

export default function ReplanDeadlineDialog({
  deadline,
  departament,
  departamentAvaliableAmount,
}: ReplanDeadlineDialogProps) {
  return (
    <CustomDialog
      id={`edit-deadline-${deadline.id}`}
      title="Replanejar prazo do departamento"
      trigger={
        <p className="flex hover:bg-muted cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <CalendarSyncIcon size={16} />
          Replanejar prazo
        </p>
      }
    >
      <ReplanDeadlineForm
        deadline={deadline}
        departament={departament}
        departamentAvaliableAmount={departamentAvaliableAmount}
      />
    </CustomDialog>
  );
}
