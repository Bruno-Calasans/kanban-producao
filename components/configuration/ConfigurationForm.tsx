/* eslint-disable react/no-children-prop */
"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import { useState } from "react";
import { ProductionFlow } from "@/types/database.type";
import SaveButton from "@/components/custom/buttons/SaveButton";
import handleFormError from "@/utils/errorHandler";
import useSetDefaultProductionFlow from "@/hooks/production-flow/useSetDefaultProductionFlow";
import { DefaultProductionFlowField } from "./form/fields/DefaultProductionFlowField";
import { useAppForm, ConfigurationFormSchema, formSchema } from "./form/configurationFormContext";


export default function ConfigurationForm() {
  const [selectedProductionFlow, setSelectedProductionFlow] = useState<ProductionFlow>()
  const { mutateAsync: setDefaultProductionFlow, isPending } = useSetDefaultProductionFlow()


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
          await setDefaultProductionFlow({
            productionFlowId: selectedProductionFlow.id
          });
          toast.success("Fluxo de produção padrão atualizado com sucesso!");
          form.reset();
        }
      } catch (error) {
        handleFormError(error, {
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
      <DefaultProductionFlowField form={form} selectedProductionFlow={selectedProductionFlow} onChangeProductionFlow={setSelectedProductionFlow} />

      <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
        <ClearButton isLoading={isPending} onclick={() => form.reset()} />
        <SaveButton isLoading={isPending} />
      </div>
    </form>
  );
}
