"use client";

import { toast } from "sonner";
import { defaultProductionFlowValues, formSchema, useAppForm } from "./ProductionFlowFormContext";
import { FieldGroup } from "@/components/ui/field";
import { ProductionFlowNameField } from "./fields/ProductionFlowNameField";
import { ProductionFlowDescField } from "./fields/ProductionFlowDescField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductionFlowUseDefaultField } from "./fields/ProductionFlowUseDefaultField";
import { Departament } from "@/types/database.type";
import { ProductionFlowDepartamentsField } from "./fields/ProductionFlowDepartamentsField";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useCreateProductionFlow from "@/hooks/production-flow/useCreateProductionFlow";
import useCreateProductionFlowTemplate from "@/hooks/production-flow-template/useCreateProductionFlowTemplate";
import { getFinalDepartament } from "@/service/api/departamentApi";
import useGetFinalDepartament from "@/hooks/departament/useGetFinalDepartament";

export default function CreateProductionFlowForm() {
  const [selectedDepartaments, setselectedDepartaments] = useState<Departament[]>([]);
  const { mutateAsync: createProductionFlow, isPending: isProductionFlowPending } =
    useCreateProductionFlow();
  const { mutateAsync: createProductionFlowTemplate, isPending: isTemplatePending } =
    useCreateProductionFlowTemplate();
  const {
    data,
    isPending: isFinalDepartamentPending,
    error: finalDepartamentError,
  } = useGetFinalDepartament();
  const finalDepartament = data?.data;
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

        const { data: createdProductionFlow } = await createProductionFlow({
          name,
          desc: desc || "",
          is_default: !!useDefault,
          is_active: true,
        });

        // Cria templates
        const templates = [
          ...selectedDepartaments.map((departament, index) => ({
            production_flow_id: createdProductionFlow.id,
            departament_id: departament.id,
            sequence: index + 1,
          })),
        ];

        // Adiciona departamento final na lista
        finalDepartament
          ? templates.push({
              departament_id: finalDepartament.id,
              production_flow_id: createdProductionFlow.id,
              sequence: 9999999,
            })
          : null;

        await createProductionFlowTemplate(templates);

        toast.success("Fluxo de produção criado com sucesso!");
        router.push("/production-flows");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível criar o fluxo de produção",
          duplicate: "Erro: já existe um fluxo de produção com esse nome. Escolha outro",
        });
      }
    },
  });

  const isPending = isProductionFlowPending || isTemplatePending || isFinalDepartamentPending;

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
