"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";
import { PlusIcon } from "lucide-react";
import CreateDeadlineForm from "../forms/create-deadline/CreateDeadlineForm";

type CreateDeadlineDialogProps = {
  movimentations: MovimentationPopulated[];
  deadlinesByMovimentation: Map<number, MovimentationDeadlinePopulated[]>;
  processStatesByMovimentation: Map<number, ProcessState[]>;
};

export default function CreateDeadlineDialog({
  movimentations,
  deadlinesByMovimentation,
  processStatesByMovimentation,
}: CreateDeadlineDialogProps) {
  return (
    <CustomDialog
      id="create-deadline"
      title="Criar prazo"
      maxContentWidth={900}
      trigger={
        <Button size="xs" className="bg-emerald-500 hover:bg-emerald-600">
          <PlusIcon />
          Novo prazo
        </Button>
      }
    >
      <CreateDeadlineForm
        movimentations={movimentations}
        deadlinesByMovimentation={deadlinesByMovimentation}
        processStatesByMovimentation={processStatesByMovimentation}
      />
    </CustomDialog>
  );
}
