import useGetAllProductionFlow from "@/hooks/production-flow/useGetAllProductionFlow";
import { SingleSelector } from "./SingleSelector";
import { Departament, ProductionFlow } from "@/types/database.type";
import { useState } from "react";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";


type ReformedProductionFlowSelectorProps = {
    defaultProductionFlow?: ProductionFlow;
    onSelectProductionFlow(productionFlow: ProductionFlow): void;
}


export default function ReformedProductionFlowSelector({ defaultProductionFlow, onSelectProductionFlow }: ReformedProductionFlowSelectorProps) {
    const [selectedProductionFlow, setSelectedProductionFlow] = useState<ProductionFlow | undefined>()
    const [useDefault, setUseDefault] = useState<boolean | "indeterminate">(true);
    const { data, isPending } = useGetAllProductionFlow();
    const productionFlows = data ? data.data : [];

    return (
        <div className="flex flex-col gap-3">
            {!useDefault && (
                <SingleSelector<ProductionFlow>
                    data={productionFlows}
                    selectedData={selectedProductionFlow}
                    defaultData={defaultProductionFlow}
                    labelSelector="name"
                    isLoading={isPending}
                    onChange={setSelectedProductionFlow}
                    loadingMsg="Carregando fluxos de produção..."
                    noItemFoundMsg="Nenhum fluxo de produção encontrado"
                    placeholder="Selecione um fluxo de produção"
                />
            )}
            <Field orientation="horizontal">
                <Checkbox
                    id="use-default-production-flow"
                    name="use-default-production-flow"
                    checked={useDefault}
                    onCheckedChange={setUseDefault}
                />
                <FieldContent>
                    <FieldLabel htmlFor="use-default-production-flow">
                        Usar fluxo de produção padrão
                    </FieldLabel>
                    <FieldDescription>
                        Usar fluxo de produção definido nas{" "}
                        <Link href="/configuracao">
                            <Button className="self-start p-0" variant="link">
                                configurações
                            </Button>
                        </Link>
                    </FieldDescription>
                </FieldContent>
            </Field>
        </div>


    )

}