"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import CreateDeadlineForm from "../forms/create-deadline/CreateDeadlineForm";

export default function CreateDeadlineDialog() {
  return (
    <CustomDialog
      id="create-deadline"
      title="Criar prazo"
      maxContentWidth={700}
      trigger={
        <Button size="xs" className="bg-emerald-500 hover:bg-emerald-600">
          <PlusIcon />
          Novo prazo
        </Button>
      }
    >
      <CreateDeadlineForm />
    </CustomDialog>
  );
}
