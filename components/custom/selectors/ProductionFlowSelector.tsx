/* eslint-disable react-hooks/exhaustive-deps */
import { ProductionFlow } from "@/types/database.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/custom/Loader";
import useGetAllProductionFlow from "@/hooks/production-flow/useGetAllProductionFlow";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type ProductionFlowSelectorProps = {
  name: string;
  defaultProductionFlow?: ProductionFlow;
  selectedProductionFlow?: ProductionFlow;
  onValueChange(productionFlow: ProductionFlow): void;
};

export default function ProductionFlowSelector({
  name,
  selectedProductionFlow,
  defaultProductionFlow,
  onValueChange,
}: ProductionFlowSelectorProps) {
  const [useDefault, setUseDefault] = useState<boolean | "indeterminate">(true);
  const { data, isPending } = useGetAllProductionFlow();
  const productionFlows = data ? data.data : [];
  const hasDefaultProductionFlow = productionFlows.find((flow) => flow.is_default);
  const hasProductionFlow = productionFlows.length > 0;

  const handleValueChange = (productionFlowName: string) => {
    const foundProductionFlow = productionFlows.find(
      (productionFlow) =>
        productionFlow.name.toLocaleUpperCase() == productionFlowName.toLocaleUpperCase(),
    );
    onValueChange(foundProductionFlow!);
  };

  useEffect(() => {
    if (isPending) return;

    if (defaultProductionFlow) {
      setUseDefault(false);
      onValueChange(defaultProductionFlow);
      return;
    }

    if (useDefault && hasDefaultProductionFlow) {
      onValueChange(hasDefaultProductionFlow);
    }

    if (useDefault && !hasDefaultProductionFlow) {
      setUseDefault(false);
    }
  }, [selectedProductionFlow, defaultProductionFlow, hasDefaultProductionFlow, isPending]);


  console.log('selected production flow ', selectedProductionFlow)


  if (isPending) return <Loader className="text-sm" title="Carregando fluxos de produção..." />;

  if (!hasProductionFlow)
    return (
      <div>
        Você não tem nenhum Fluxo de Produção cadastrado. Cadastre um novo fluxo em{" "}
        <Link className="hover:underline font-bold" href="/configuration">
          <Button className="self-start p-0" variant="link">
            configurações
          </Button>
        </Link>
        .
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {!useDefault && (
        <Select
          name={name}
          value={selectedProductionFlow ? selectedProductionFlow.name : ""}
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="min-w-30 w-full">
            <SelectValue placeholder="Selecione o fluxo de produção" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            {productionFlows.length > 0 &&
              productionFlows.map((productionFlow) => (
                <SelectItem key={productionFlow.id} value={productionFlow.name}>
                  {productionFlow.name} {productionFlow.is_default && "(Padrão)"}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      {hasDefaultProductionFlow && !defaultProductionFlow && (
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
      )}
    </div>
  );
}
