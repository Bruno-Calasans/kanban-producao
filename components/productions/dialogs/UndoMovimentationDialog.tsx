import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogID } from "@/hooks/dialog/DialogContext";
import type { MovimentationPopulated, ProductionPopulated } from "@/types/database.type";
import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDialog from "@/hooks/dialog/useDialog";
import useDeleteMovimentation from "@/hooks/movimentation/useDeleteMovimentation";
import useDeleteDailyGoal from "@/hooks/daily-goal/useDeleteDailyGoal";
import useDeleteProductionDeadline from "@/hooks/production-deadline/useDeleteProductionDeadline";
import HasBadge from "@/components/custom/badges/HasBadge";
import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

type UndoMovimentationDialogProps = {
  production: ProductionPopulated;
  movimentation: MovimentationPopulated;
  children?: React.ReactNode;
};

export default function UndoMovimentationDialog({
  production,
  movimentation,
  children,
}: UndoMovimentationDialogProps) {
  const router = useRouter();
  const { closeDialog } = useDialog();
  const dialogId: DialogID = `delete-movimentation-${movimentation.id}`;

  const { mutateAsync: deleteMovimentation, isPending: isDeleteMovimentationPending } =
    useDeleteMovimentation();
  const { mutateAsync: deleteDailyGoal, isPending: isDeleteDailyGoalPending } =
    useDeleteDailyGoal();
  const { mutateAsync: deleteDeadline, isPending: isDeleteDeadlinePending } =
    useDeleteProductionDeadline();

  const [deleteDeadlineChecked, setDeleteDeadlineChecked] = useState(false);

  const dailyGoalId = movimentation.goal_id;
  const deadlineId = movimentation.deadline_id;

  const handleDelete = async () => {
    try {
      await deleteMovimentation(movimentation.id);

      if (dailyGoalId) {
        await deleteDailyGoal(dailyGoalId);
      }

      if (deadlineId && deleteDeadlineChecked) {
        await deleteDeadline(deadlineId);
      }

      toast.success("Movimentação excluída com sucesso!");
      closeDialog(dialogId);
      router.push(`/productions/${production.id}`);
    } catch (error) {
      toast.error("Erro ao excluir movimentação. Tente novamente.");
    }
  };

  const isPending =
    isDeleteMovimentationPending || isDeleteDailyGoalPending || isDeleteDeadlinePending;

  return (
    <CustomDialog id={dialogId} title="Excluir última movimentação" trigger={children}>
      <div className="flex flex-col gap-3">
        <p>
          Tem certeza que deseja excluir a última movimentação da produção{" "}
          <strong>{production.op}</strong>?
        </p>

        {/* <div className="flex flex-col gap-1">
          <p>
            <span className="font-bold">Tem meta associada? </span> <HasBadge has={!!dailyGoalId} />
          </p>
          <p>
            <span className="font-bold">Tem Prazo associado?</span> <HasBadge has={!!dailyGoalId} />
          </p>
        </div> */}

        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              id="terms-checkbox-desc"
              name="terms-checkbox-desc"
              checked={deleteDeadlineChecked}
              onCheckedChange={(value) => setDeleteDeadlineChecked(!!value)}
            />
            <FieldContent>
              <FieldLabel htmlFor="terms-checkbox-desc">Excluir prazo</FieldLabel>
              <FieldDescription>
                O prazo associado a essa movimentação também será excluído
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>

        <p className="italic text-sm">
          Essa ação não pode ser desfeita. Todas as <span className="font-bold">metas</span> e{" "}
          <span className="font-bold">prazos</span> associados à essa movimentação também serão
          excluídos.
        </p>

        <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
          <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
          <DeleteButton isLoading={isPending} onClick={handleDelete} />
        </div>
      </div>
    </CustomDialog>
  );
}
