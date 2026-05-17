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
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";
import Loader from "../../custom/Loader";

type ProcessExecutionActionsProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  deadline?: MovimentationDeadlinePopulated | null;
  disabled?: boolean;
};

export default function MovimentationDeadlineEndsAtInput({
  movimentation,
  departament,
  deadline,
  disabled,
}: ProcessExecutionActionsProps) {
  const startDate = deadline?.started_at ? new Date(deadline?.started_at) : undefined;
  const endDate = deadline?.finished_at ? new Date(deadline?.finished_at) : undefined;
  // const maxDate = deadline?.expected_at ? new Date(deadline?.expected_at) : undefined;

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
    const hasChanged = endDate?.getTime() !== date?.getTime();
    if (!date || !hasChanged) return;

    if (deadline) {
      try {
        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            finished_at: date.toISOString(),
          },
        });
        toast.success("Data de término atualizada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Data de término não foi salva",
        });
      }
    } else {
      try {
        await createMovimentationDeadline({
          movimentation_id: movimentation.id,
          departament_id: departament.id,
          finished_at: date.toISOString(),
          started_at: null,
          expected_at: null,
          status: "IN_PROGRESS",
        });
        toast.success("Data de término criada");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: Não foi possível criar a data de término",
        });
      }
    }
  };

  const isPending = isUpdateDeadlinePending || createDeadlinePending;
  const isError = isUpdateDeadlineError || createDeadlineError;
  const isEndDateMoreThanStartDate =
    startDate && endDate && endDate.getTime() < startDate.getTime();

  if (isPending) return <Loader title="Salvando..." />;

  return (
    <div>
      <DatePickerInput
        currentDate={endDate}
        minDate={startDate}
        maxDate={new Date()}
        onChangeDate={onChangeDate}
        placeholder={endDate ? "" : "Data de término"}
        disabled={disabled}
      />
      {isEndDateMoreThanStartDate && (
        <p className="text-sm text-muted-foreground">
          {startDate && <span>Início: {startDate.toLocaleDateString("pt-BR")}</span>}
        </p>
      )}
    </div>
  );
}
