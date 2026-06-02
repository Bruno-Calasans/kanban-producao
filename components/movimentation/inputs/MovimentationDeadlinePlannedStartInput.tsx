"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
} from "@/types/database.type";
import { DatePickerInput } from "@/components/custom/DatePicker";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";
import errorHandler from "@/utils/errorHandler";
import { toast } from "sonner";
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";
import Loader from "@/components/custom/Loader";
import { XIcon } from "lucide-react";

type ProcessExecutionActionsProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  deadline?: MovimentationDeadlinePopulated | null;
  disabled?: boolean;
};

export default function MovimentationDeadlinePlannedStartInput({
  movimentation,
  departament,
  deadline,
  disabled,
}: ProcessExecutionActionsProps) {
  const today = new Date();
  const plannedStartDate = deadline?.planned_start_at
    ? new Date(deadline?.planned_start_at)
    : undefined;

  today.setHours(0, 0, 0, 0);

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
    const hasChanged = plannedStartDate?.getTime() !== date?.getTime();
    const plannedEndDate = deadline?.planned_end_at ? new Date(deadline.planned_end_at) : null;
    const actualStartDate = deadline?.actual_start_at ? new Date(deadline.actual_start_at) : null;
    const actualEndDate = deadline?.actual_end_at ? new Date(deadline.actual_end_at) : null;

    date?.setHours(0, 0, 0, 0);
    plannedEndDate?.setHours(0, 0, 0, 0);
    actualStartDate?.setHours(0, 0, 0, 0);
    actualEndDate?.setHours(0, 0, 0, 0);

    // A data planejada de começo deve ser menor que a data planejada de fim
    const isPlannedStartDateMoreThanPlannedEndDate =
      date && plannedEndDate && date.getTime() >= plannedEndDate.getTime();

    // A data de começo planejada deve ser menor ou igual a data que realmente começou
    const isPlannedStartDateMoreThanActualStartDate =
      date && actualStartDate && date.getTime() >= actualStartDate.getTime();

    // A data de começo deve ser menor ou igual que a data real de término
    const isPlannedStartDateMoreThanActualEndDate =
      date && actualEndDate && date.getTime() > actualEndDate.getTime();

    if (!date || !hasChanged) return;

    if (deadline) {
      try {
        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            planned_start_at: date.toISOString(),
            planned_end_at: isPlannedStartDateMoreThanPlannedEndDate
              ? null
              : deadline.planned_end_at,
            actual_start_at: isPlannedStartDateMoreThanActualStartDate
              ? null
              : deadline.actual_start_at,
            actual_end_at: isPlannedStartDateMoreThanActualEndDate ? null : deadline.actual_end_at,
          },
        });
        toast.success("Data de início planejada atualizada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Data de início não foi salva",
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
        toast.success("Data de início planejada criada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Não foi possível criar a data de início",
        });
      }
    }
  };

  const removePlannedStartDate = async () => {
    if (!deadline?.id) return;
    try {
      await updateMovimentationDeadline({
        movimentationDeadlineId: deadline.id,
        updateData: {
          planned_start_at: null,
        },
      });
      toast.success("Data de início planejada removida");
    } catch (error) {
      errorHandler(error, {
        default: "Erro: Não foi possível remover a data de início planejada",
      });
    }
  };

  const isPending = isUpdateDeadlinePending || createDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError;

  if (isPending) return <Loader title="Salvando..." />;

  return (
    <div className="flex items-center gap-1">
      <DatePickerInput
        minDate={today}
        currentDate={plannedStartDate}
        placeholder={plannedStartDate ? "" : "Data de início"}
        onChangeDate={onChangeDate}
        disabled={disabled}
        extraAddon={
          plannedStartDate &&
          !isPending &&
          !disabled && (
            <div
              title="Remover data de início planejada"
              className="cursor-default bg-red-500 rounded-full hover:bg-red-600"
              onClick={() => removePlannedStartDate()}
            >
              <XIcon className="text-white h-4 w-4" />
            </div>
          )
        }
      />
    </div>
  );
}
