"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
} from "@/types/database.type";
import { DatePickerInput } from "../../custom/DatePicker";
import useUpdateMovimentationDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import errorHandler from "@/utils/errorHandler";
import { toast } from "sonner";
import useCreateMovimentationDeadline from "@/hooks/production-deadline/useCreateProductionDeadline";
import Loader from "../../custom/Loader";
import { XIcon } from "lucide-react";

type ProcessExecutionActionsProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  deadline?: MovimentationDeadlinePopulated | null;
  disabled?: boolean;
};

export default function MovimenationDeadlinePlannedEndInput({
  movimentation,
  departament,
  deadline,
  disabled,
}: ProcessExecutionActionsProps) {
  const plannedStartDate = deadline?.planned_start_at
    ? new Date(deadline.planned_start_at)
    : undefined;

  const plannedEndDate = deadline?.planned_end_at ? new Date(deadline?.planned_end_at) : undefined;

  const {
    mutateAsync: updateMovimentationDeadline,
    isPending: isUpdateDeadlinePending,
    isError: isUpdateDeadlineError,
  } = useUpdateMovimentationDeadline();

  const {
    mutateAsync: createMovimentationDeadline,
    isPending: createDeadlinePending,
    isError: createDeadlineError,
  } = useCreateMovimentationDeadline();

  const onChangeDate = async (date?: Date) => {
    const actualStartDate = deadline?.actual_start_at ? new Date(deadline.actual_start_at) : null;
    const actualEndDate = deadline?.actual_end_at ? new Date(deadline.actual_end_at) : null;

    date?.setHours(0, 0, 0, 0);
    plannedStartDate?.setHours(0, 0, 0, 0);
    plannedEndDate?.setHours(0, 0, 0, 0);
    actualStartDate?.setHours(0, 0, 0, 0);
    actualEndDate?.setHours(0, 0, 0, 0);

    const hasChanged = plannedEndDate?.getTime() !== date?.getTime();

    // A data planejada de fim deve ser menor ou igual que a data planejada de começo
    const isPlannedEndDateLessThanPlannedStartDate =
      date && plannedStartDate && date.getTime() < plannedStartDate.getTime();

    // A data de fim planejada deve ser menor ou igual a data que realmente começou
    const isPlannedEndDateMoreThanActualStartDate =
      date && actualStartDate && date.getTime() >= actualStartDate.getTime();

    // A data de fim planejada deve ser menor ou igual que a data real de término
    const isPlannedEndDateMoreThanActualEndDate =
      date && actualEndDate && date.getTime() > actualEndDate.getTime();

    if (!date || !hasChanged) return;

    if (deadline) {
      try {
        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,

            planned_end_at: date.toISOString(),

            planned_start_at: isPlannedEndDateLessThanPlannedStartDate
              ? null
              : deadline.planned_start_at,

            actual_start_at: isPlannedEndDateMoreThanActualStartDate
              ? null
              : deadline.actual_start_at,

            actual_end_at: isPlannedEndDateMoreThanActualEndDate ? null : deadline.actual_end_at,
          },
        });
        toast.success("Data de fim planejada atualizada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Data de fim não foi salva",
        });
      }
    } else {
      try {
        await createMovimentationDeadline({
          movimentation_id: movimentation.id,
          departament_id: departament.id,
          planned_start_at: date.toISOString(),
          planned_end_at: null,
          actual_start_at: null,
          actual_end_at: null,
        });
        toast.success("Data de fim planejada criada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Não foi possível criar a data de fim planejada",
        });
      }
    }
  };

  const removePlannedEndDate = async () => {
    if (!deadline?.id) return;
    try {
      await updateMovimentationDeadline({
        movimentationDeadlineId: deadline.id,
        updateData: {
          planned_end_at: null,
        },
      });
      toast.success("Data de fim planejada removida");
    } catch (error) {
      errorHandler(error, {
        default: "Erro: Não foi possível remover a data de fim planejada",
      });
    }
  };

  const isPending = isUpdateDeadlinePending || createDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError;

  if (isPending) return <Loader title="Salvando..." />;

  return (
    <DatePickerInput
      minDate={plannedStartDate}
      currentDate={plannedEndDate}
      onChangeDate={onChangeDate}
      placeholder={plannedEndDate ? "" : "Data de fim"}
      disabled={disabled}
      extraAddon={
        plannedEndDate &&
        !isPending &&
        !disabled && (
          <div
            title="Remover data de fim planejada"
            className="cursor-default bg-red-500 rounded-full hover:bg-red-600"
            onClick={() => removePlannedEndDate()}
          >
            <XIcon className="text-white h-4 w-4" />
          </div>
        )
      }
    />
  );
}
