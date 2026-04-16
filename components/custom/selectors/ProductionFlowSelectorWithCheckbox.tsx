/* eslint-disable react-hooks/exhaustive-deps */
import { ProductionFlow } from "@/types/database.type";
import useGetAllProductionFlow from "@/hooks/production-flow/useGetAllProductionFlow";
import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SingleSelector } from "./SingleSelector";

type ProductionFlowSelectorWithCheckboxProps = {
  defaultProductionFlow?: ProductionFlow;
  onValueChange(productionFlow?: ProductionFlow): void;
};

export default function ProductionFlowSelectorWithCheckbox({
  defaultProductionFlow,
  onValueChange,
}: ProductionFlowSelectorWithCheckboxProps) {
  const [selectedProductionFlow, setSelectedProductionFlow] = useState<
    ProductionFlow | undefined
  >();
  const [useDefault, setUseDefault] = useState<boolean | "indeterminate">(
    defaultProductionFlow ? false : true,
  );
  const { data, isPending } = useGetAllProductionFlow();
  const productionFlows = data ? data.data : [];
  const hasDefault = productionFlows.find((flow) => flow.is_default);
  const defaultflow = defaultProductionFlow || hasDefault || productionFlows[0];

  const handleUseDefault = (value: boolean) => {
    if (value) valueChangeHandler(hasDefault);
    setUseDefault(value);
  };

  const valueChangeHandler = (productionFlow?: ProductionFlow) => {
    setSelectedProductionFlow(productionFlow);
    onValueChange(productionFlow);
  };

  return (
    <div className="flex flex-col gap-3">
      <SingleSelector<ProductionFlow>
        disabled={useDefault}
        data={productionFlows}
        selectedData={
          !useDefault ? selectedProductionFlow : productionFlows.find((flow) => flow.is_default)
        }
        defaultData={defaultflow}
        labelSelector="name"
        isLoading={isPending}
        onChange={valueChangeHandler}
        placeholder="Selecione um fluxo de produção"
        loadingMsg="Carregando fluxos de produção..."
        noItemFoundMsg={
          <div>
            <p>Nenhum fluxo de produção encontrado</p>
            <p>
              Defina um fluxo em{" "}
              <Link href="/configuracao">
                <Button className="self-start p-0" variant="link">
                  configurações
                </Button>
              </Link>
              .
            </p>
          </div>
        }
      />

      {hasDefault && (
        <Field orientation="horizontal">
          <Checkbox
            id="use-default-production-flow"
            checked={useDefault}
            onCheckedChange={handleUseDefault}
            className="group-has-disabled/field:opacity-100"
          />
          <FieldContent>
            <FieldLabel>Usar fluxo de produção padrão</FieldLabel>
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
      )}
    </div>
  );
}
