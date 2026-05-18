"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
} from "@/types/database.type";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";
import errorHandler from "@/utils/errorHandler";
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";
import Loader from "@/components/custom/Loader";
import { toast } from "sonner";
import { DatePickerInput } from "@/components/custom/DatePicker";

type ProcessExecutionActionsProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  deadline?: MovimentationDeadlinePopulated | null;
  disabled?: boolean;
};

export default function MovimentationDeadlineInput({
  movimentation,
  departament,
  deadline,
  disabled,
}: ProcessExecutionActionsProps) {
  const minDate = deadline?.started_at ? new Date(deadline?.started_at) : undefined;
  const expectedDate = deadline?.expected_at ? new Date(deadline?.expected_at) : undefined;

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
    const hasChanged = expectedDate?.getTime() !== date?.getTime();
    if (!date || !hasChanged) return;

    if (deadline) {
      try {
        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            expected_at: date?.toISOString(),
          },
        });
        toast.success("Prazo atualizado");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Prazo não foi salvo",
        });
      }
    } else {
      try {
        await createMovimentationDeadline({
          movimentation_id: movimentation.id,
          departament_id: departament.id,
          expected_at: date?.toISOString(),
          finished_at: null,
          started_at: null,
        });
        toast.success("Prazo criado");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Não foi possível criar o prazo",
        });
      }
    }
  };

  const isPending = isUpdateDeadlinePending || createDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError;

  if (isPending) return <Loader title="Salvando..." />;

  return (
    <DatePickerInput
      currentDate={expectedDate}
      onChangeDate={onChangeDate}
      placeholder={expectedDate ? "" : "Data do Prazo"}
      disabled={disabled}
      minDate={minDate}
    />
  );
}
