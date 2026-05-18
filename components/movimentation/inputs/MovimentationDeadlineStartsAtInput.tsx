"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
} from "@/types/database.type";
import { DatePickerInput } from "../../custom/DatePicker";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";
import errorHandler from "@/utils/errorHandler";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";
import Loader from "../../custom/Loader";

type ProcessExecutionActionsProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  deadline?: MovimentationDeadlinePopulated | null;
  disabled?: boolean;
};

export default function MovimentationDeadlineStartsAtInput({
  movimentation,
  departament,
  deadline,
  disabled,
}: ProcessExecutionActionsProps) {
  const startDate = deadline?.started_at ? new Date(deadline?.started_at) : undefined;

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
    const hasChanged = startDate?.getTime() !== date?.getTime();
    const startDateIsMoreThanEndDate =
      deadline?.finished_at && date && new Date(deadline.finished_at).getTime() < date.getTime();

    const startDateIsMoreThanExpectedDate =
      deadline?.expected_at && date && new Date(deadline.expected_at).getTime() < date.getTime();

    if (!date || !hasChanged) return;

    if (deadline) {
      try {
        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            started_at: date.toISOString(),
            finished_at: startDateIsMoreThanEndDate ? null : deadline.finished_at,
            expected_at: startDateIsMoreThanExpectedDate ? null : deadline.expected_at,
          },
        });
        toast.success("Data de início atualizada");
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
          started_at: date.toISOString(),
          expected_at: null,
          finished_at: null,
        });
        toast.success("Data de início criada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Não foi possível criar a data de início",
        });
      }
    }
  };

  const isPending = isUpdateDeadlinePending || createDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError;

  if (isPending) return <Loader title="Salvando..." />;

  return (
    <DatePickerInput
      currentDate={startDate}
      onChangeDate={onChangeDate}
      placeholder={startDate ? "" : "Data de início"}
      disabled={disabled}
    />
  );
}
