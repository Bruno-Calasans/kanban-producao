/* eslint-disable react/no-children-prop */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { ProductionFlow } from "@/types/database.type";
import { DefaultProductionFlowField } from "./form/fields/DefaultProductionFlowField";
import { useAppForm, ConfigurationFormSchema, formSchema } from "./form/configurationFormContext";
import SaveButton from "@/components/custom/buttons/SaveButton";
import errorHandler from "@/utils/errorHandler";
import useSetDefaultProductionFlow from "@/hooks/production-flow/useSetDefaultProductionFlow";

export default function ConfigurationForm() {
  const [selectedProductionFlow, setSelectedProductionFlow] = useState<ProductionFlow>();
  const { setDefault, isPending } = useSetDefaultProductionFlow();

  const form = useAppForm({
    defaultValues: {
      productionFlowName: "",
    } as ConfigurationFormSchema,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async () => {
      try {
        if (selectedProductionFlow) {
          await setDefault(selectedProductionFlow.id);
          toast.success("Fluxo de produção padrão atualizado com sucesso!");
          form.reset();
        }
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível salvar as configurações.",
        });
      }
    },
  });

  return (
    <form
      id="configuration-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <DefaultProductionFlowField
        form={form}
        selectedProductionFlow={selectedProductionFlow}
        onChangeProductionFlow={setSelectedProductionFlow}
      />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        {/* <ClearButton isLoading={isPending} onclick={() => form.reset()} /> */}
        <SaveButton isLoading={isPending} hiddenIcon />
      </div>
    </form>
  );
}
