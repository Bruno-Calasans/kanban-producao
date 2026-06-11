import {
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  MovimentationStatus,
  ProcessExecutionPopulated,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";
import { ErrorAlert } from "@/components/custom/alerts/ErrorAlert";
import { InfoAlert } from "@/components/custom/alerts/InfoAlert";
import { differenceInDays } from "date-fns";
import ReturnProcessExecutionDialog from "@/components/process-execution/dialogs/ReturnProcessExecutionDialog";
import useExternalProcessState from "@/hooks/external-process-state/useExternalProcess";
import { DepartamentState } from "@/utils/calcDepartamentDeadlineState";

type MovimentationHeaderAlertsProps = {
  movimentation: MovimentationPopulated;
  departamentStates: DepartamentState[];
  deadlines: MovimentationDeadlinePopulated[];
  processExecutions: ProcessExecutionPopulated[];
  flowTemplates: ProductionFlowTemplateWithProcess[];
};

export default function MovimentationHeaderAlerts({
  movimentation,
  processExecutions,
  departamentStates,
  deadlines,
  flowTemplates,
}: MovimentationHeaderAlertsProps) {
  const { externalProcessStates } = useExternalProcessState({
    movimentation,
    processExecutions,
  });

  const movimentationStatus = movimentation.status;
  const expiredDepartaments = departamentStates.filter((dpt) => dpt.status === "EXPIRED");
  const avaliableProcesses = flowTemplates.map((flow) => flow.process);
  const externalDeadlines = deadlines.filter(
    (deadline) => deadline.departament.is_external === true,
  );

  return (
    <div id="movimentation-alerts" className="flex gap-2 flex-col my-3">
      {deadlines.length == 0 &&
        !(["CANCELLED", "COMPLETED"] as MovimentationStatus[]).includes(movimentationStatus) && (
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
          const expireDate =
            hasDeadline && hasDeadline.planned_end_at
              ? new Date(hasDeadline.planned_end_at)
              : undefined;

          expireDate?.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          const isExpired = expireDate ? expireDate.getTime() < today.getTime() : undefined;

          if (isExpired)
            return (
              <ErrorAlert
                key={state.process.id}
                title={`Peças no departamento externo com atraso de ${differenceInDays(today, expireDate!)} dia(s)`}
                description={`Você tem ${state.avaliableAmount} peças na ${state.process.name} que deveria voltar ${expireDate?.toLocaleDateString()}. 
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
              title={`Peças em departamento externo ${expireDate ? ` com prazo de retorno ` + expireDate?.toLocaleDateString() : ""}`}
              description={
                <p>
                  Você tem <span className="font-bold">{state.avaliableAmount}</span> peças na{" "}
                  <span className="font-bold">{state.process.name}</span>. Clique no botão
                  <span className="font-bold"> Retornar</span> para pegar de volta essas peças.
                </p>
              }
              actionLabel={
                <ReturnProcessExecutionDialog
                  avaliableProcesses={avaliableProcesses}
                  externalProcessState={state}
                />
              }
            />
          );
        })}
    </div>
  );
}
