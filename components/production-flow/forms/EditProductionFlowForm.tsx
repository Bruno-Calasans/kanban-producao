/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { toast } from "sonner";
import { formSchema, ProductionFlowSchema, useAppForm } from "./ProductionFlowFormContext";
import { FieldGroup } from "@/components/ui/field";
import { ProductionFlowNameField } from "./fields/ProductionFlowNameField";
import { ProductionFlowDescField } from "./fields/ProductionFlowDescField";
import { ProductionFlowDepartamentsField } from "./fields/ProductionFlowDepartamentsField";
import { useState } from "react";
import { Departament, ProductionFlow } from "@/types/database.type";
import { useRouter } from "next/navigation";
import { ProductionFlowUseDefaultField } from "./fields/ProductionFlowUseDefaultField";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import errorHandler from "@/utils/errorHandler";
import useCreateProductionFlowTemplate from "@/hooks/production-flow-template/useCreateProductionFlowTemplate";
import useGetAllProductionFlowTemplates from "@/hooks/production-flow-template/useGetAllFlowTemplatesByProductionFlow";
import useDeleteProductionFlowTemplates from "@/hooks/production-flow-template/useDeleteProductionFlowTemplates";
import useUpdateProductionFlow from "@/hooks/production-flow/useUpdateProductionFlow";
import CancelButton from "@/components/custom/buttons/CancelButton";
import ClearButton from "@/components/custom/buttons/ClearButton";

type CreateProductionFlowFormProps = {
  productionFlow: ProductionFlow;
};

export default function EditProductionFlowForm({ productionFlow }: CreateProductionFlowFormProps) {
  const router = useRouter();
  const [selectedDepartaments, setSelectedDepartaments] = useState<Departament[]>([]);

  const { mutateAsync: updateProductionFlow, isPending: isProductionFlowPending } =
    useUpdateProductionFlow();

  const {
    mutateAsync: createProductionFlowTemplateAsync,
    isPending: isCreateProductionFlowTemplatePending,
  } = useCreateProductionFlowTemplate();

  const {
    mutateAsync: deleteFlowTemplatesAsync,
    isPending: isDeleteProductionFlowTemplatesPending,
  } = useDeleteProductionFlowTemplates();

  const { data, isPending: isProductionFlowTemplatesPending } = useGetAllProductionFlowTemplates(
    productionFlow.id,
  );
  const productionFlowTemplates = data?.data || [];

  const departaments = productionFlowTemplates.map((template) => template.departament);
  const defaultSelectedDepartaments = departaments.filter((dep) => dep.is_final != true);
  const finalDepartament = departaments.find((dpt) => dpt.is_final);

  const isPending =
    isProductionFlowPending ||
    isProductionFlowTemplatesPending ||
    isCreateProductionFlowTemplatePending ||
    isDeleteProductionFlowTemplatesPending;

  const form = useAppForm({
    defaultValues: {
      name: productionFlow.name,
      desc: productionFlow.desc || "",
      useDefault: productionFlow.is_default || false,
    } as ProductionFlowSchema,
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // atualiza informações básicas do fluxo de produção (nome, descrição, usar padrão) sem mudar os processos

        const { name, desc, useDefault } = value;
        await updateProductionFlow({
          productionFlowId: productionFlow.id,
          updateData: {
            name,
            desc,
            is_default: !!useDefault,
          },
        });

        //  mudança apenas nos processos, sem mudança nas outras informações do fluxo de produção
        // remove processos antigos
        const templateIdsToDelete = productionFlowTemplates.map((template) => template.id);
        await deleteFlowTemplatesAsync({
          productionFlowTemplateIds: templateIdsToDelete,
        });

        // criar novos departamentos do fluxo de produção com os processos selecionados
        const templates = [
          ...selectedDepartaments.map((departament, index) => ({
            production_flow_id: productionFlow.id,
            departament_id: departament.id,
            sequence: index,
          })),
        ];

        finalDepartament
          ? templates.push({
              production_flow_id: productionFlow.id,
              departament_id: finalDepartament.id,
              sequence: 9999999,
            })
          : null;

        await createProductionFlowTemplateAsync(templates);

        toast.success("Fluxo de produção atualizado com sucesso!");
        router.push("/production-flows");
      } catch (error) {
        errorHandler(error, {
          default: "Erro: não foi possível atualizar o fluxo de produção",
          duplicate:
            "Erro: já existe outro fluxo de produção com esse nome. Escolha outro nome e tente novamente.",
        });
      }
    },
  });

  const resetFormToDefaultValues = () => {
    form.reset({
      name: productionFlow.name,
      desc: productionFlow.desc || "",
      useDefault: productionFlow.is_default || false,
      departamentNames: defaultSelectedDepartaments.map((departament) => departament.name) || [],
    });
    setSelectedDepartaments(defaultSelectedDepartaments);
  };

  return (
    <form
      id="edit-production-flow-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <ProductionFlowNameField form={form} />
        <ProductionFlowDescField form={form} />
        <ProductionFlowUseDefaultField form={form} />
        {!isProductionFlowTemplatesPending && (
          <ProductionFlowDepartamentsField
            form={form}
            defaultDepartaments={defaultSelectedDepartaments}
            selectedDepartaments={selectedDepartaments}
            onSelect={setSelectedDepartaments}
          />
        )}
      </FieldGroup>

      <div
        id="edit-production-flow-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <CancelButton label="Cancelar" onClick={() => router.push("/production-flows")} />
        <ClearButton
          label="Limpar"
          isLoading={isPending}
          onClick={() => resetFormToDefaultValues()}
        />

        <form.Subscribe selector={(state) => state}>
          {(state) => (
            <ConfirmButton
              hiddenIcon
              disabled={state.isDefaultValue}
              isLoading={isPending}
              label="Salvar"
              loadingMsg="Salvando..."
            />
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
