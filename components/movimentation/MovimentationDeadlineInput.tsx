"use client";

import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { DatePickerInput } from "../custom/DatePicker";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";
import errorHandler from "@/utils/errorHandler";
import { toast } from "sonner";
import { useState } from "react";
import { setDate } from "date-fns";

type ProcessExecutionActionsProps = {
  deadline?: MovimentationDeadlinePopulated | null;
};

export default function MovimentationDeadlineInput({ deadline }: ProcessExecutionActionsProps) {
  const startDate = deadline?.expected_at ? new Date(deadline?.expected_at) : undefined;
  const [currentDate, setCurrentDate] = useState<Date | undefined>(startDate);

  const {
    mutateAsync: updateMovimentationDeadline,
    isPending,
    isError,
  } = useUpdateMovimentationDeadline();

  const onChangeDate = async (date?: Date) => {
    if (!deadline || !date) return;

    try {
      await updateMovimentationDeadline({
        movimentationDeadlineId: deadline.id,
        updateData: {
          departament_id: deadline.departament.id,
          expected_at: date?.toISOString(),
        },
      });
      toast.success("Prazo atualizado");
      setCurrentDate(date);
    } catch (error) {
      errorHandler(error, {
        default: "Erro: Prazo não foi salvo",
      });
    }
  };

  return (
    <DatePickerInput
      currentDate={currentDate}
      onChangeDate={onChangeDate}
      placeholder={startDate ? "" : "Selecione o prazo"}
    />
  );
}
