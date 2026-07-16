"use client";

import { DatePickerInput } from "@/components/custom/DatePicker";
import { toast } from "sonner";
import { useState } from "react";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import errorHandler from "@/utils/errorHandler";
import useCreateProductionDeadline from "@/hooks/production-deadline/useCreateProductionDeadline";
import useUpdateProductionDeadline from "@/hooks/production-deadline/useUpdateProductionDeadline";
import CancelButton from "@/components/custom/buttons/CancelButton";
import SaveButton from "@/components/custom/buttons/SaveButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteProductionDeadline from "@/hooks/production-deadline/useDeleteProductionDeadline";
import useCreateProductionDeadlineLog from "@/hooks/production-deadline-log/useCreateProductionDeadlineLog";
import FinishedDeadlineMsg from "./FinishedDeadlineMsg";
import normalizeDate from "@/utils/normalizeDate";
import toIsoDateString from "@/utils/toIsoDate";
import RemoveDateButton from "./RemoveDataButton";

type ProductionDeadlineDatesInputProps = {
  departamentDeadlineState: DepartamentDeadlineState;
  shortVersion?: boolean;
  onlyEndDate?: boolean;
};

export default function ProductionDeadlineDatesInput({
  departamentDeadlineState,
  shortVersion,
  onlyEndDate,
}: ProductionDeadlineDatesInputProps) {
  const { departament, production, deadline, status, expireDaysAfterEnd, departamentState } =
    departamentDeadlineState;
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [reason, setReason] = useState("");

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

  const {
    mutateAsync: createDeadlineLog,
    isPending: isCreateDeadlineLogPending,
    isError: iscCreateDeadlineLogError,
  } = useCreateProductionDeadlineLog();

  const today = new Date();
  const plannedStartDate = normalizeDate(deadline?.planned_start_at);
  const plannedEndDate = normalizeDate(deadline?.planned_end_at);
  const actualStartDate = normalizeDate(deadline?.actual_start_at);
  const actualEndDate = normalizeDate(deadline?.actual_end_at);

  // Verifica se o input da data de início mudou
  const hasStartDateChanged =
    selectedStartDate && selectedStartDate?.getTime() != plannedStartDate?.getTime();

  // Verifica se o input da data de fim mudou
  const hasEndDateChanged =
    selectedEndDate && selectedEndDate?.getTime() != plannedEndDate?.getTime();

  const hasChanged = hasStartDateChanged || hasEndDateChanged;

  const removePlannedDate = async (field: "planned_start_at" | "planned_end_at") => {
    if (!deadline?.id) return;

    try {
      await updateProductionDeadline({
        deadlineId: deadline.id,
        updateData: {
          [field]: null,
        },
      });

      toast.success("Data removida com sucesso");
    } catch (error) {
      errorHandler(error, {
        default: "Erro ao remover data",
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

  const getDatesToSave = () => ({
    startDate: selectedStartDate ?? plannedStartDate,
    endDate: selectedEndDate ?? plannedEndDate,
  });

  const updateDeadline = async () => {
    if (!deadline) return;

    const { startDate, endDate } = getDatesToSave();

    const payload = {
      departament_id: departament.id,
      planned_start_at: toIsoDateString(startDate),
      planned_end_at: toIsoDateString(endDate),
    };

    await updateProductionDeadline({
      deadlineId: deadline.id,
      updateData: payload,
    });

    await createDeadlineLog({
      deadline_id: deadline.id,
      old_planned_start_at: deadline.planned_start_at,
      old_planned_end_at: deadline.planned_end_at,
      new_planned_start_at: payload.planned_start_at,
      new_planned_end_at: payload.planned_end_at,
      reason,
    });
  };

  const createDeadline = async () => {
    await createProductionDeadline({
      production_id: production.id,
      departament_id: departament.id,
      planned_start_at: toIsoDateString(selectedStartDate),
      planned_end_at: toIsoDateString(selectedEndDate),
      actual_start_at: null,
      actual_end_at: null,
    });
  };

  const onSave = async () => {
    try {
      if (deadline) {
        await updateDeadline();
        toast.success("Prazo atualizado");
      } else {
        await createDeadline();
        toast.success("Prazo criado com sucesso");
      }

      onCancel();
    } catch (error) {
      errorHandler(error, {
        default: "Erro ao salvar prazo",
      });
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
      toast.success("Prazo excluído com sucesso");
    } catch (error) {
      errorHandler(error, {
        default: "Erro: não foi possível excluir o prazo",
      });
    }
  };

  const isPending =
    isUpdateDeadlinePending ||
    isCreateDeadlinePending ||
    isDeleteDeadlinePending ||
    isCreateDeadlineLogPending;

  const deadlineStatus = status;
  const productionStatus = departamentDeadlineState.production.status;
  const departamentStatus = departamentState.status;

  // Desativa os inputs para colocar data
  const isInputDisabled =
    deadlineStatus == "COMPLETED" ||
    productionStatus == "COMPLETED" ||
    departamentStatus == "SKIPPED" ||
    departamentStatus == "COMPLETED";

  // Só pode definir prazo se a produção ainda não começou
  const isExternalDeadline = deadline?.departament.is_external;
  const isStartDateInputDisabled = isInputDisabled;
  const isEndDateInputDisabled = !(selectedStartDate || plannedStartDate) || isInputDisabled;

  // Só posso excluir o prazo se a produção ainda não começou
  const canDeleteDeadline =
    deadline &&
    (deadline.planned_start_at || deadline.planned_end_at) &&
    productionStatus == "PENDING";

  return (
    <div className={cn("grid grid-cols-2 items-center gap-1", shortVersion && "flex flex-col")}>
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
          !isStartDateInputDisabled &&
          canDeleteDeadline && (
            <RemoveDateButton
              title="Remover data planejada de início"
              onClick={() => removePlannedDate("planned_end_at")}
            />
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
          !isEndDateInputDisabled &&
          canDeleteDeadline && (
            <RemoveDateButton
              title="Remover data planejada de fim"
              onClick={() => removePlannedDate("planned_end_at")}
            />
          )
        }
      />

      <div className="pt-1 flex justify-end items-end gap-1 col-span-2">
        {/* Mostra quando o prazo concluído */}
        {deadline && (
          <FinishedDeadlineMsg
            deadline={deadline}
            status={status}
            expireDaysAfterEnd={expireDaysAfterEnd}
          />
        )}

        {/* Botões */}
        <div className="flex gap-2 items-end">
          <div className="flex flex-col gap-1 items-end self-end">
            {hasChanged && deadline && (
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Motivo do replanejamento (opcional)"
                className="w-75 p-2 border-2 rounded-sm"
              />
            )}

            {/* Delete, cancel and save buttons */}
            <div className={cn("flex items-end gap-1 mt-1 flex-1")}>
              {canDeleteDeadline && !shortVersion && (
                <DeleteButton
                  label="Excluir"
                  onClick={onDelete}
                  isLoading={isPending}
                  size="xs"
                  hiddenIcon
                />
              )}

              {hasChanged && (
                <>
                  <CancelButton
                    label="Cancelar"
                    size="xs"
                    onClick={onCancel}
                    isLoading={isPending}
                  />
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
      </div>
    </div>
  );
}
