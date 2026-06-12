"use client";

import { toast } from "sonner";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { defaultProductionFlowValues, formSchema, useAppForm } from "./ProductionFlowFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import { ProductionFlowNameField } from "./fields/ProductionFlowNameField";
import useCreateProductionFlow from "@/hooks/production-flow/useCreateProductionFlow";
import { ProductionFlowDescField } from "./fields/ProductionFlowDescField";
import { useState } from "react";
import useCreateProductionFlowTemplate from "@/hooks/production-flow-template/useCreateProductionFlowTemplate";
import { useRouter } from "next/navigation";
import { ProductionFlowUseDefaultField } from "./fields/ProductionFlowUseDefaultField";
import CancelButton from "@/components/custom/buttons/CancelButton";
import { Departament } from "@/types/database.type";
import { ProductionFlowDepartamentsField } from "./fields/ProductionFlowDepartamentsField";

export default function CreateProductionFlowForm() {
  const { mutateAsync: productionAsync, isPending } = useCreateProductionFlow();
  const { mutateAsync: mutateTemplateAsync } = useCreateProductionFlowTemplate();
  const [selectedDepartaments, setselectedDepartaments] = useState<Departament[]>([]);
  const router = useRouter();

  const form = useAppForm({
    defaultValues: defaultProductionFlowValues,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { name, desc, useDefault } = value;
        const { data: createdProductionFlow } = await productionAsync({
          name,
          desc: desc || "",
          is_default: !!useDefault,
          is_active: true,
        });

        await mutateTemplateAsync(
          selectedDepartaments.map((departament, index) => ({
            production_flow_id: createdProductionFlow.id,
            departament_id: departament.id,
            sequence: index,
          })),
        );

        toast.success("Fluxo de produção criado com sucesso!");
        router.push("/production-flows");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o fluxo de produção",
          duplicate: "Erro: já existe UM fluxo de produção com esse nome. Escolha outro",
        });
      }
    },
  });

  return (
    <form
      id="create-product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ProductionFlowNameField form={form} />
        <ProductionFlowDescField form={form} />
        <ProductionFlowUseDefaultField form={form} />
        <ProductionFlowDepartamentsField
          form={form}
          selectedDepartaments={selectedDepartaments}
          onSelect={setselectedDepartaments}
        />
      </FieldGroup>

      <div
        id="create-product-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton isLoading={isPending} onClick={() => router.push("/production-flows")} />
        <ConfirmButton hiddenIcon isLoading={isPending} label="Criar" loadingMsg="Criando..." />
      </div>
    </form>
  );
}
