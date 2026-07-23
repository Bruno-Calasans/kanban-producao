import {
  ProductionPopulated,
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionFlowTemplatePopulated,
  MovimentationPopulated,
  ProductionStatus,
} from "@/types/database.type";
import { ErrorAlert } from "@/components/custom/alerts/ErrorAlert";
import { InfoAlert } from "@/components/custom/alerts/InfoAlert";
import { differenceInDays } from "date-fns";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import ReturnDepartamentDialog from "@/components/production/dialogs/ReturnDepartamentDialog";
import useExternalDepartamentState from "@/hooks/external-departament-state/useExternalDepartamentState";
import EditDeadlineDialog from "@/components/productions/dialogs/EditDeadlineDialog";

type ProductionHeaderAlertsProps = {
  production: ProductionPopulated;
  departamentStates: DepartamentState[];
  movimentations: MovimentationPopulated[];
  deadlines: ProductionDeadlinePopulated[];
  flowTemplates: ProductionFlowTemplatePopulated[];
  departamentDeadlineStates: DepartamentDeadlineState[];
};

export default function ProductionHeaderAlerts({
  production,
  deadlines,
  flowTemplates,
  movimentations,
  departamentStates,
  departamentDeadlineStates,
}: ProductionHeaderAlertsProps) {
  const { externalDepartamentStates } = useExternalDepartamentState({
    production,
    movimentations,
  });

  const productionStatus = production.status;
  const expiredDepartaments = departamentDeadlineStates.filter((dpt) => dpt.status === "EXPIRED");
  const avaliableDepartaments = flowTemplates.map((flow) => flow.departament);
  const externalDeadlines = deadlines.filter(
    (deadline) => deadline.departament.is_external === true,
  );

  const noDeadlineAlert = (["CANCELLED", "COMPLETED"] as ProductionStatus[]).includes(
    productionStatus,
  );

  const cancelledAlert = productionStatus == "CANCELLED";

  const expiredDeadlineAlert = expiredDepartaments.length > 0 && productionStatus != "CANCELLED";

  return (
    <div id="production-alerts" className="flex gap-0 flex-col py-0.5 mb-1">
      {deadlines.length == 0 && !noDeadlineAlert && (
        <InfoAlert
          title="Produção sem prazo definido"
          description={
            <p>
              Nenhum departamento tem prazo de entrega. Vá na aba{" "}
              <span className="font-bold underline">Prazos</span> e defina os prazos para os
              departamentos.
            </p>
          }
          hideCloseButton
        />
      )}

      {cancelledAlert && (
        <ErrorAlert
          title="Produção Cancelada"
          description={
            <p>
              Esta produção foi cancelada dia{" "}
              <span className="font-bold">
                {new Date(production.updated_at).toLocaleDateString()}
              </span>
              . Você não pode realizar mais ações ou definir prazos para esta movimentação.
            </p>
          }
          hideCloseButton
        />
      )}

      {expiredDeadlineAlert && (
        <ErrorAlert
          title="Departamento(s) com prazo expirado"
          description={
            <p>
              Você tem <span className="font-bold">{expiredDepartaments.length}</span> prazos
              expirados. Verifique a aba de <span className="font-bold underline">Prazos</span> para
              mais detalhes.
            </p>
          }
          hideCloseButton
        />
      )}

      {/* Departamentos externos */}
      {externalDepartamentStates &&
        externalDepartamentStates.length > 0 &&
        productionStatus != "CANCELLED" &&
        externalDepartamentStates.map((state) => {
          const externalDeadline = externalDeadlines.find(
            (deadline) => deadline.departament.id === state.departament.id,
          );

          if (state.avaliableAmount === 0) return null;

          const today = new Date();
          const expireDate =
            externalDeadline && externalDeadline.planned_end_at
              ? new Date(externalDeadline.planned_end_at)
              : undefined;

          expireDate?.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          const isExpired = expireDate ? expireDate.getTime() < today.getTime() : undefined;

          if (isExpired)
            return (
              <ErrorAlert
                hideCloseButton
                key={state.departament.id}
                title={`Peças no departamento externo com atraso de ${differenceInDays(today, expireDate!)} dia(s)`}
                description={`Você tem ${state.avaliableAmount} peças na ${state.departament.name} que deveria voltar ${expireDate?.toLocaleDateString()}. 
                Clique no botão "Retornar" para pegar de volta essas peças.`}
                actionLabel={
                  <ReturnDepartamentDialog
                    avaliableDepartaments={avaliableDepartaments}
                    externalProcessState={state}
                  />
                }
              />
            );

          return (
            <InfoAlert
              key={state.departament.id}
              title={`Peças em departamento externo ${expireDate ? ` com prazo de retorno ` + expireDate?.toLocaleDateString() : ""}`}
              description={
                <p>
                  Você tem <span className="font-bold">{state.avaliableAmount}</span> peças no
                  departamento <span className="font-bold">{state.departament.name}</span>. Clique
                  no botão
                  <span className="font-bold"> Retornar</span> para pegar de volta essas peças.
                </p>
              }
              actionLabel={
                <div className="flex gap-1">
                  {externalDeadline && <EditDeadlineDialog deadline={externalDeadline} />}
                  <ReturnDepartamentDialog
                    avaliableDepartaments={avaliableDepartaments}
                    externalProcessState={state}
                  />
                </div>
              }
            />
          );
        })}
    </div>
  );
}
