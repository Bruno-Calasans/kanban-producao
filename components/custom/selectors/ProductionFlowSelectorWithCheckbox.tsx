/* eslint-disable react-hooks/exhaustive-deps */
import { ProductionFlow } from "@/types/database.type";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SingleSelector } from "./SingleSelector";
import Link from "next/link";
import useGetAllActiveProductionFlows from "@/hooks/production-flow/useGetAllActiveProductionFlows";
import NoItemFoundMsg from "../msgs/NoItemMsg";

type ProductionFlowSelectorWithCheckboxProps = {
  selectedProductionFlow?: ProductionFlow;
  defaultProductionFlow?: ProductionFlow;
  disabled?: boolean;
  onValueChange(productionFlow?: ProductionFlow): void;
};

export default function ProductionFlowSelectorWithCheckbox({
  selectedProductionFlow,
  defaultProductionFlow,
  disabled,
  onValueChange,
}: ProductionFlowSelectorWithCheckboxProps) {
  const [useDefault, setUseDefault] = useState<boolean | "indeterminate">(false);
  const { data, isPending } = useGetAllActiveProductionFlows();
  const productionFlows = data ? data.data : [];
  const foundDefaultFlow = productionFlows.find((flow) => flow.is_default);
  const defaultflow = defaultProductionFlow || foundDefaultFlow || productionFlows[0];

  const handleUseDefault = (value: boolean) => {
    if (value) onValueChange(foundDefaultFlow);
    setUseDefault(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <SingleSelector<ProductionFlow>
        disabled={disabled || useDefault}
        data={productionFlows}
        selectedData={selectedProductionFlow}
        defaultData={defaultflow}
        labelSelector="name"
        isLoading={isPending}
        onChange={onValueChange}
        placeholder="Selecione um fluxo de produção"
        loadingMsg="Carregando fluxos de produção..."
        noItemFoundMsg={
          <NoItemFoundMsg
            title="Nenhum fluxo de produção encontrado"
            desc="Cadastre um novo fluxo em"
            url="/production-flows"
            urlName="fluxos de produção"
          />
        }
      />

      {foundDefaultFlow && (
        <Field orientation="horizontal">
          <Checkbox
            id="use-default-production-flow"
            checked={useDefault}
            onCheckedChange={handleUseDefault}
            className="group-has-disabled/field:opacity-100"
            disabled={disabled}
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
