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

  return (
    <div id="production-alerts" className="flex gap-2 flex-col my-3">
      {deadlines.length == 0 &&
        !(["CANCELLED", "COMPLETED"] as ProductionStatus[]).includes(productionStatus) && (
          <InfoAlert
            title="Produção sem prazo definido"
            description="Nenhum departamento tem prazo de entrega. Vá na aba 'Prazos' e defina os prazos para os departamentos."
          />
        )}

      {productionStatus == "CANCELLED" && (
        <ErrorAlert
          title="Produção Cancelada"
          description={`Esta produção foi cancelada dia ${new Date(production.updated_at).toLocaleDateString()}. Você não pode realizar mais ações ou definir prazos para esta movimentação.`}
          hideCloseButton
        />
      )}

      {expiredDepartaments.length > 0 && productionStatus != "CANCELLED" && (
        <ErrorAlert
          title="Departamento com prazo expirado"
          description="Existem departamentos com prazos expirados. Verifique a aba de prazos para mais detalhes."
        />
      )}

      {externalDepartamentStates &&
        externalDepartamentStates.length > 0 &&
        productionStatus != "CANCELLED" &&
        externalDepartamentStates.map((state) => {
          const hasDeadline = externalDeadlines.find(
            (deadline) => deadline.departament.id === state.departament.id,
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
                <ReturnDepartamentDialog
                  avaliableDepartaments={avaliableDepartaments}
                  externalProcessState={state}
                />
              }
            />
          );
        })}
    </div>
  );
}
