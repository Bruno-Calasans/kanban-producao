"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import EditDeadlineForm from "../forms/edit-deadline/EditDeadlineForm";
import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { CalendarSyncIcon } from "lucide-react";

type EditDeadlineDialogProps = {
  deadline: MovimentationDeadlinePopulated;
};

export default function EditDeadlineDialog({ deadline }: EditDeadlineDialogProps) {
  return (
    <CustomDialog
      id={`edit-deadline-${deadline.id}`}
      title="Editar prazo"
      trigger={
        <p className="flex hover:bg-muted cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <CalendarSyncIcon size={16} />
          Editar prazo
        </p>
      }
    >
      <EditDeadlineForm deadline={deadline} />
    </CustomDialog>
  );
}
