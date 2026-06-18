import { Button } from "@/components/ui/button";
import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { RotateCcwIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import CreateReprocessForm from "../forms/reprocess-form/CreateReprocessForm";

type CreateReprocessMovimentationDialogProps = {
  departamentState: DepartamentState;
  departamentStates: DepartamentState[];
  departamentDeadline: ProductionDeadlinePopulated | null;
};

export default function CreateReprocessMovimentationDialog({
  departamentState,
  departamentStates,
  departamentDeadline,
}: CreateReprocessMovimentationDialogProps) {
  return (
    <CustomDialog
      id={`reprocess-movimentation-${departamentState.departament.id}`}
      title="Reprocessar Produção"
      trigger={
        <Button className="bg-amber-400 hover:bg-amber-500" size="xs">
          Reprocessar
          <RotateCcwIcon />
        </Button>
      }
    >
      <CreateReprocessForm
        departamentState={departamentState}
        departamentStates={departamentStates}
        departamentDeadline={departamentDeadline}
      />
    </CustomDialog>
  );
}
