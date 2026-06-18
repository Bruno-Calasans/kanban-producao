import { ProductionFlow } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useGetAllActiveProductionFlows from "@/hooks/production-flow/useGetAllActiveProductionFlows";
import NoItemFoundMsg from "../msgs/NoItemMsg";

type ProductionFlowSelectorProps = {
  selectedProductionFlow?: ProductionFlow;
  defaultProductionFlow?: ProductionFlow;
  onValueChange(productionFlow?: ProductionFlow): void;
};

export default function ProductionFlowSelector({
  selectedProductionFlow,
  defaultProductionFlow,
  onValueChange,
}: ProductionFlowSelectorProps) {
  const { data, isPending } = useGetAllActiveProductionFlows();
  const productionFlows = data ? data.data : [];
  const defaultFlow =
    defaultProductionFlow || productionFlows.find((flow) => flow.is_default) || productionFlows[0];

  return (
    <SingleSelector<ProductionFlow>
      data={productionFlows}
      selectedData={selectedProductionFlow}
      defaultData={defaultFlow}
      labelSelector="name"
      isLoading={isPending}
      onChange={onValueChange}
      placeholder="Selecione um fluxo de produção"
      loadingMsg="Carregando fluxos de produção..."
      noItemFoundMsg={
        <NoItemFoundMsg
          title="Nenhum fluxo de produção encontrado"
          desc="Cadastre um novo fluxo de produção em"
          url="/production-flows"
          urlName="fluxos de produção"
        />
      }
    />
  );
}
