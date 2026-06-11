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
import { XIcon } from "lucide-react";
import { useState } from "react";
import CancelButton from "@/components/custom/buttons/CancelButton";
import SaveButton from "@/components/custom/buttons/SaveButton";
import { DepartamentState } from "@/utils/calcDepartamentDeadlineState";
import { cn } from "@/lib/utils";

type MovimentationDeadlineDatesInputProps = {
  departamentState: DepartamentState;
};

export default function MovimentationDeadlineDatesInput({
  departamentState,
}: MovimentationDeadlineDatesInputProps) {
  const { departament, movimentation, deadline, status } = departamentState;
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();

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

  const today = new Date();
  const actualStartDate = deadline?.actual_start_at ? new Date(deadline.actual_start_at) : null;
  const actualEndDate = deadline?.actual_end_at ? new Date(deadline.actual_end_at) : null;
  const plannedEndDate = deadline?.planned_end_at ? new Date(deadline?.planned_end_at) : undefined;
  const plannedStartDate = deadline?.planned_start_at
    ? new Date(deadline?.planned_start_at)
    : undefined;

  today.setHours(0, 0, 0, 0);
  plannedStartDate?.setHours(0, 0, 0, 0);
  plannedEndDate?.setHours(0, 0, 0, 0);
  selectedStartDate?.setHours(0, 0, 0, 0);
  selectedEndDate?.setHours(0, 0, 0, 0);
  actualStartDate?.setHours(0, 0, 0, 0);
  actualEndDate?.setHours(0, 0, 0, 0);

  const hasStartDateChanged =
    selectedStartDate && selectedStartDate?.getTime() != plannedStartDate?.getTime();

  const hasEndDateChanged =
    selectedEndDate && selectedEndDate?.getTime() != plannedStartDate?.getTime();

  const hasChanged = hasStartDateChanged || hasEndDateChanged;

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

  const onChangeDate = (date?: Date, type: "START" | "END" = "START") => {
    date?.setHours(0, 0, 0, 0);
    if (type == "START") {
      setSelectedStartDate(date);
      if (date && selectedEndDate && date.getTime() > selectedEndDate.getTime())
        setSelectedEndDate(undefined);
    } else {
      setSelectedEndDate(date);
    }
  };

  const onSave = async () => {
    if (deadline) {
      try {
        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            planned_start_at: selectedStartDate ? selectedStartDate.toISOString() : null,
            planned_end_at: selectedEndDate ? selectedEndDate.toISOString() : null,
          },
        });
        toast.success("Prazo atualizado");
        onCancel();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: prazo não foi salvo",
        });
      }
    } else {
      try {
        await createMovimentationDeadline({
          movimentation_id: movimentation.id,
          departament_id: departament.id,
          planned_start_at: selectedStartDate ? selectedStartDate.toISOString() : null,
          planned_end_at: selectedEndDate ? selectedEndDate.toISOString() : null,
          actual_start_at: null,
          actual_end_at: null,
        });
        toast.success("Prazo criado com sucesso");
        onCancel();
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Não foi possível criar o prazo",
        });
      }
    }
  };

  const onCancel = () => {
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
  };

  const isPending = isUpdateDeadlinePending || createDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError;
  const isStarDateInputDisabled =
    status === "COMPLETED" || departamentState.movimentation.status == "CANCELLED";
  const isEndDateInputDisabled =
    status === "COMPLETED" ||
    !(selectedStartDate || plannedStartDate) ||
    departamentState.movimentation.status == "CANCELLED";

  return (
    <div
      className={cn("grid grid-rows-1 grid-cols-2 items-center gap-1", hasChanged && "grid-rows-2")}
    >
      {/* Escolher data de início planejada */}
      <DatePickerInput
        className="w-full"
        // minDate={today}
        currentDate={selectedStartDate || plannedStartDate}
        placeholder={plannedStartDate ? "" : "Data de início"}
        onChangeDate={(date) => onChangeDate(date, "START")}
        disabled={isStarDateInputDisabled}
        extraAddon={
          plannedStartDate &&
          !isPending &&
          !isStarDateInputDisabled && (
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
      {/* Escolher data de fim planejada */}
      <DatePickerInput
        className="w-full"
        minDate={selectedStartDate || plannedStartDate}
        currentDate={selectedEndDate || plannedEndDate}
        onChangeDate={(date) => onChangeDate(date, "END")}
        placeholder={plannedEndDate ? "" : "Data de fim"}
        disabled={isEndDateInputDisabled}
        extraAddon={
          plannedEndDate &&
          !isPending &&
          !isEndDateInputDisabled && (
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
      <div></div>
      <div className="pt-1 flex justify-self-end gap-1">
        {(hasStartDateChanged || hasEndDateChanged) && (
          <>
            <CancelButton label="Cancelar" size="xs" onClick={onCancel} isLoading={isPending} />
            <SaveButton
              label="Salvar"
              size="xs"
              onClick={onSave}
              isLoading={isPending}
              hiddenIcon
            />
          </>
        )}
      </div>
    </div>
  );
}
