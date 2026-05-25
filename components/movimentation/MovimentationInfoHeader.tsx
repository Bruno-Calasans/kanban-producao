import {
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProcessState,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";
import Link from "next/link";
import MovimentationStatusBadge from "@/components/custom/badges/MovimentationStatusBadge";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import EditMovimentationForm from "../movimentations/forms/EditMovimentationForm";
import { Edit2Icon, Trash2Icon, BanIcon, PlusIcon } from "lucide-react";
import DeleteMovimentationDialog from "../movimentations/dialogs/DeleteMovimentationDialog";
import CancelMovimentationDialog from "../movimentations/dialogs/CancelMovimentationDialog";
import { ErrorAlert } from "@/components/custom/alerts/ErrorAlert";
import { DepartamentState } from "@/hooks/departament-state/useDepartamentState";
import GoToCalendarButton from "../custom/buttons/GoToCalendarButton";
import { InfoAlert } from "@/components/custom/alerts/InfoAlert";
import ReturnProcessExecutionDialog from "../process-execution/dialogs/ReturnProcessExecutionDialog";
import useExternalProcessState from "@/hooks/external-process-state/useExternalProcess";
import { differenceInDays } from "date-fns";

type MovimentationInfoHeadergProps = {
  movimentation: MovimentationPopulated;
  departamentStates: DepartamentState[];
  deadlines: MovimentationDeadlinePopulated[];
  processExecutions: ProcessExecutionPopulated[];
  flowTemplates: ProductionFlowTemplateWithProcess[];
  processStates: ProcessState[];
};

export default function MovimentationInfoHeaderg({
  movimentation,
  departamentStates,
  deadlines,
  processExecutions,
  flowTemplates,
  processStates,
}: MovimentationInfoHeadergProps) {
  const { externalProcessStates } = useExternalProcessState({
    movimentation,
    processExecutions,
  });

  const movimentationStatus = movimentation.status;
  const canEdit = movimentationStatus == "PENDING";
  const canDelete = movimentationStatus == "PENDING";
  const canCancel = movimentationStatus != "CANCELLED" && movimentationStatus != "COMPLETED";

  const expiredDepartaments = departamentStates.filter((dpt) => dpt.status === "EXPIRED");
  const avaliableProcesses = flowTemplates.map((flow) => flow.process);
  const externalDeadlines = deadlines.filter(
    (deadline) => deadline.departament.is_external === true,
  );

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>Informações da Movimentação</PageTitle>
        <div className="flex  justify-end items-end gap-1">
          <BackButton to="/movimentations" label="Voltar à página de Movimentações" />
          <GoToCalendarButton to="/calendar/weekly" label="Ver calendário semanal" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <p>
          <strong>ID:</strong> #{movimentation.id}
        </p>
        <p className="flex gap-1">
          <strong>Produto:</strong>{" "}
          <Link
            className="flex gap-1 justify-center items-center hover:underline"
            href={`/products/${movimentation.product.id}`}
          >
            {movimentation.product.name}
          </Link>
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>OP:</strong> {movimentation.product.op}
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>Status:</strong> <MovimentationStatusBadge movimentation={movimentation} />
        </p>
        <p>
          <strong>Quantidade:</strong> {movimentation.amount}
        </p>

        {movimentation.status === "COMPLETED" && (
          <p>
            <strong>Concluída em:</strong> {new Date(movimentation.updated_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Botões de ação da movimentação */}
      <div className="flex gap-2 border-black">
        {canEdit && (
          <CustomDialog
            id="edit-movimentation"
            title="Editar Movimentação"
            trigger={
              <Button className="m-0" size="xs">
                <Edit2Icon />
                Editar
              </Button>
            }
          >
            <EditMovimentationForm movimentation={movimentation} />
          </CustomDialog>
        )}

        {canCancel && (
          <CustomDialog
            id="cancel-movimentation"
            title="Editar Movimentação"
            trigger={
              <Button variant="destructive" className="m-0" size="xs">
                <BanIcon />
                Cancelar
              </Button>
            }
          >
            <CancelMovimentationDialog movimentation={movimentation} />
          </CustomDialog>
        )}

        {canDelete && (
          <CustomDialog
            id="delete-movimentation"
            title="Excluir Movimentação"
            trigger={
              <Button variant="destructive" className="m-0" size="xs">
                <Trash2Icon />
                Excluir
              </Button>
            }
          >
            <DeleteMovimentationDialog movimentation={movimentation} />
          </CustomDialog>
        )}
      </div>

      {/* Alertas da movimentação */}
      <div id="movimentation-alerts" className="flex gap-2 flex-col my-3">
        {deadlines.length == 0 && (
          <InfoAlert
            title="Movimentação sem prazo definido"
            description="Nenhum departamento tem prazo de entrega. Vá na aba 'Prazos' e defina os prazos para os departamentos."
          />
        )}

        {movimentationStatus == "CANCELLED" && (
          <ErrorAlert
            title="Movimentação Cancelada"
            description={`Esta movimentação foi cancelada dia ${new Date(movimentation.updated_at).toLocaleDateString()}. Você não pode realizar mais ações ou definir prazos para esta movimentação.`}
            hideCloseButton
          />
        )}

        {expiredDepartaments.length > 0 && movimentationStatus != "CANCELLED" && (
          <ErrorAlert
            title="Departamento com prazo expirado"
            description="Existem departamentos com prazos expirados. Verifique a aba de prazos para mais detalhes."
          />
        )}

        {externalProcessStates &&
          externalProcessStates.length > 0 &&
          movimentationStatus != "CANCELLED" &&
          externalProcessStates.map((state) => {
            const hasDeadline = externalDeadlines.find(
              (deadline) => deadline.departament.id === state.process.departament_id,
            );

            if (state.avaliableAmount === 0) return null;

            const today = new Date();
            const expiredDate =
              hasDeadline && hasDeadline.expected_at
                ? new Date(hasDeadline.expected_at)
                : undefined;

            expiredDate?.setHours(0, 0, 0, 0)
            today.setHours(0, 0, 0, 0)
            const isExpired = expiredDate ? expiredDate.getTime() < today.getTime() : undefined;

            if (isExpired)
              return (
                <ErrorAlert
                  key={state.process.id}
                  title={`Peças no departamento externo com atraso de ${differenceInDays(today, expiredDate!)} dia(s)`}
                  description={`Você tem ${state.avaliableAmount} peças na ${state.process.name} que deveria voltar ${expiredDate?.toLocaleDateString()}. 
                Clique no botão "Retornar" para pegar de volta essas peças.`}
                  actionLabel={
                    <ReturnProcessExecutionDialog
                      avaliableProcesses={avaliableProcesses}
                      externalProcessState={state}
                    />
                  }
                  hideCloseButton
                />
              );

            return (
              <InfoAlert
                key={state.process.id}
                title={`Peças no departamento externo ${expiredDate ? ` com prazo de retorno ` + expiredDate?.toLocaleDateString() : undefined}`}
                description={`Você tem ${state.avaliableAmount} peças na ${state.process.name}. 
                Clique no botão "Retornar" para pegar de volta essas peças.`}
                actionLabel={
                  <ReturnProcessExecutionDialog
                    avaliableProcesses={avaliableProcesses}
                    externalProcessState={state}
                  />
                }
                hideCloseButton
              />
            );
          })}
      </div>
    </div>
  );
}
