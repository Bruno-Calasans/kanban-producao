"use client";

import {
  Departament,
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessState,
} from "@/types/database.type";
import { DatePickerInput } from "../../custom/DatePicker";
import useUpdateMovimentationDeadline from "@/hooks/movimentation-deadline/useUpdateMovimentationDeadline";
import errorHandler from "@/utils/errorHandler";
import { toast } from "sonner";
import useCreateMovimentationDeadline from "@/hooks/movimentation-deadline/useCreateMovimentationDeadline";
import Loader from "../../custom/Loader";
import useMoveToNextDepartament from "@/hooks/process-executation/useMoveToNextDepartament";

type ProcessExecutionActionsProps = {
  departament: Departament;
  movimentation: MovimentationPopulated;
  movimentationProcessStates: ProcessState[];
  deadline?: MovimentationDeadlinePopulated | null;
  disabled?: boolean;
};

export default function MovimentationDeadlineEndsAtInput({
  movimentation,
  departament,
  deadline,
  disabled,
  movimentationProcessStates,
}: ProcessExecutionActionsProps) {
  const startDate = deadline?.started_at ? new Date(deadline.started_at) : undefined;
  const finishDate = deadline?.finished_at ? new Date(deadline.finished_at) : undefined;

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

  const {
    mutateAsync: moveToNextDepartament,
    isPending: isMoveToNextDepartamentPending,
    error: moveToNextDepartamentError,
  } = useMoveToNextDepartament();

  const onChangeDate = async (date?: Date) => {
    const hasChanged = finishDate?.getTime() !== date?.getTime();
    if (!date || !hasChanged) return;

    if (deadline) {
      try {
        const finishDate = date.toISOString();
        await moveToNextDepartament({
          processStates: movimentationProcessStates,
          finished_at: finishDate,
          responsibleId: null,
          startedAt: null,
        });

        await updateMovimentationDeadline({
          movimentationDeadlineId: deadline.id,
          updateData: {
            departament_id: departament.id,
            finished_at: finishDate,
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

  const isPending =
    isUpdateDeadlinePending || createDeadlinePending || isMoveToNextDepartamentPending;
  const isError = isUpdateDeadlineError || createDeadlineError || moveToNextDepartamentError;

  if (isPending) return <Loader title="Salvando..." />;

  return (
    <div>
      <DatePickerInput
        currentDate={finishDate}
        minDate={startDate}
        // maxDate={new Date()}
        onChangeDate={onChangeDate}
        placeholder={finishDate ? "" : "Data de término"}
        disabled={disabled}
      />
    </div>
  );
}
