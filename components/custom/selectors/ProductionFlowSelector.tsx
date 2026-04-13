import { ProductionFlow } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";
import useGetAllProductionFlow from "@/hooks/production-flow/useGetAllProductionFlow";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ProductionFlowSelectorProps = {
    selectedProductionFlow?: ProductionFlow
    defaultProductionFlow?: ProductionFlow;
    onValueChange(productionFlow?: ProductionFlow): void;
};


export default function ProductionFlowSelector({ selectedProductionFlow, defaultProductionFlow, onValueChange }: ProductionFlowSelectorProps) {
    const { data, isPending } = useGetAllProductionFlow();
    const productionFlows = data ? data.data : [];
    const defaultFlow = defaultProductionFlow || productionFlows.find(flow => flow.is_default)


    return <SingleSelector<ProductionFlow>
        data={productionFlows}
        selectedData={selectedProductionFlow}
        defaultData={defaultFlow}
        labelSelector="name"
        isLoading={isPending}
        onChange={onValueChange}
        placeholder="Selecione um fluxo de produção"
        loadingMsg="Carregando fluxos de produção..."
        noItemFoundMsg={
            <div>
                <p>Nenhum fluxo de produção encontrado</p>
                <p>
                    Defina um fluxo em <Link href="/configuracao">
                        <Button className="self-start p-0" variant="link">
                            configurações
                        </Button>
                    </Link>.
                </p>
            </div>
        }
    />

}