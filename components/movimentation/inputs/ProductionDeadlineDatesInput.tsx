"use client";

import { DatePickerInput } from "@/components/custom/DatePicker";
import { toast } from "sonner";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import { cn } from "@/lib/utils";
import errorHandler from "@/utils/errorHandler";
import useCreateProductionDeadline from "@/hooks/production-deadline/useCreateProductionDeadline";
import useUpdateProductionDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import CancelButton from "@/components/custom/buttons/CancelButton";
import SaveButton from "@/components/custom/buttons/SaveButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteProductionDeadline from "@/hooks/production-deadline/useDeleteProductionDeadline";

type ProductionDeadlineDatesInputProps = {
  departamentState: DepartamentDeadlineState;
};

export default function ProductionDeadlineDatesInput({
  departamentState,
}: ProductionDeadlineDatesInputProps) {
  const { departament, production, deadline, status } = departamentState;
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();

  const {
    mutateAsync: createProductionDeadline,
    isPending: isUpdateDeadlinePending,
    isError: isUpdateDeadlineError,
  } = useCreateProductionDeadline();

  const {
    mutateAsync: updateProductionDeadline,
    isPending: isCreateDeadlinePending,
    isError: createDeadlineError,
  } = useUpdateProductionDeadline();

  const {
    mutateAsync: deleteDeadline,
    isPending: isDeleteDeadlinePending,
    isError: deleteDeadlineError,
  } = useDeleteProductionDeadline();

  const today = new Date();

  const actualStartDate = deadline?.actual_start_at
    ? new Date(deadline.actual_start_at)
    : undefined;
  const actualEndDate = deadline?.actual_end_at ? new Date(deadline.actual_end_at) : undefined;

  const plannedStartDate = deadline?.planned_start_at
    ? new Date(deadline?.planned_start_at)
    : undefined;
  const plannedEndDate = deadline?.planned_end_at ? new Date(deadline?.planned_end_at) : undefined;

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
      await updateProductionDeadline({
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
      await updateProductionDeadline({
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
    selectedStartDate?.setHours(0, 0, 0, 0);
    selectedEndDate?.setHours(0, 0, 0, 0);

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
      let startDate: Date | undefined;
      let endDate: Date | undefined;

      if (selectedStartDate) {
        startDate = selectedStartDate;
      } else if (deadline?.planned_start_at) {
        startDate = new Date(deadline?.planned_start_at);
      }

      if (selectedEndDate) {
        endDate = selectedEndDate;
      } else if (deadline?.planned_end_at) {
        endDate = new Date(deadline?.planned_end_at);
      }

      try {
        await updateProductionDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            planned_start_at: startDate ? startDate.toISOString() : null,
            planned_end_at: endDate ? endDate.toISOString() : null,
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
        await createProductionDeadline({
          production_id: production.id,
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

  const onDelete = async () => {
    if (!deadline) return;
    try {
      await deleteDeadline(deadline.id);
      toast.success("Prazo removido");
    } catch (error) {
      toast.error("Erro: não foi possível remover o prazo");
    }
  };

  const isPending = isUpdateDeadlinePending || isCreateDeadlinePending || isDeleteDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError || deleteDeadlineError;

  const canDeleteDeadline =
    deadline && production.status != "CANCELLED" && production.status != "COMPLETED";

  const productionStatus = departamentState.production.status;

  const isStartDateInputDisabled = status === "COMPLETED" || productionStatus == "CANCELLED";

  const isEndDateInputDisabled =
    status === "COMPLETED" ||
    !(selectedStartDate || plannedStartDate) ||
    productionStatus == "CANCELLED" ||
    productionStatus == "COMPLETED";

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
        disabled={isStartDateInputDisabled}
        extraAddon={
          plannedStartDate &&
          !isPending &&
          !isStartDateInputDisabled && (
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

      <div className="pt-1 flex justify-between gap-1 col-span-2">
        {/* Mostra quando o prazo concluído */}
        <div>
          {deadline && deadline.actual_end_at && status === "COMPLETED" && (
            <p className="text-stone-800/70 self-start">
              Prazo concluído em: {new Date(deadline.actual_end_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {/* Botão para deletar prazo */}
          {canDeleteDeadline && (
            <DeleteButton
              label="Excluir prazo"
              onClick={onDelete}
              isLoading={isPending}
              size="xs"
              hiddenIcon
            />
          )}
          {/* Botão para salvar prazo */}
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
    </div>
  );
}
