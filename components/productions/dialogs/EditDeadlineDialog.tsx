"use client";

import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import CustomDialog from "@/components/custom/CustomDialog";
import EditDeadlineForm from "../../deadline/EditDeadlineForm";

type EditDeadlineDialogProps = {
  deadline: ProductionDeadlinePopulated;
};

export default function EditDeadlineDialog({ deadline }: EditDeadlineDialogProps) {
  return (
    <CustomDialog
      id={`edit-deadline-${deadline.id}`}
      title="Editar prazo"
      trigger={
        <Button
          className="bg-indigo-400 hover:bg-indigo-500"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Editar
          <Edit2Icon />
        </Button>
      }
    >
      <EditDeadlineForm deadline={deadline} />
    </CustomDialog>
  );
}
