/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { toast } from "sonner";
import ClearButton from "@/components/custom/buttons/ClearButton";
import ConfirmButton from "@/components/custom/buttons/ConfirmButton";
import { formSchema, ProductionFlowSchema, useAppForm } from "./ProductionFlowFormContext";
import { FieldGroup } from "@/components/ui/field";
import errorHandler from "@/utils/errorHandler";
import { ProductionFlowNameField } from "./fields/ProductionFlowNameField";
import { ProductionFlowDescField } from "./fields/ProductionFlowDescField";
import { ProductionFlowProcessesField } from "./fields/ProductionFlowProcessesField";
import { useEffect, useState } from "react";
import { Process, ProductionFlow } from "@/types/database.type";
import useCreateProductionFlowTemplate from "@/hooks/production-flow-template/useCreateProductionFlowTemplate";
import { useRouter } from "next/navigation";
import { ProductionFlowUseDefaultField } from "./fields/ProductionFlowUseDefaultField";
import useGetAllProductionFlowTemplates from "@/hooks/production-flow-template/useGetAllProductionFlowTemplates";
import useDeleteProductionFlowTemplates from "@/hooks/production-flow-template/useDeleteProductionFlowTemplates";
import useUpdateProductionFlow from "@/hooks/production-flow/useUpdateProductionFlow";

type CreateProductionFlowFormProps = {
  productionFlow: ProductionFlow;
};

export default function EditProductionFlowForm({ productionFlow }: CreateProductionFlowFormProps) {
  const router = useRouter();

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
  const [selectedProcesses, setSelectedProcesses] = useState<Process[]>([]);

  const productionFlowTemplates = data?.data || [];
  const defaultSelectedProcesses = productionFlowTemplates.map((template) => template.process);
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
          flowtemplateId: productionFlow.id,
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

        // criar novos processos do fluxo de produção com os processos selecionados
        await createProductionFlowTemplateAsync(
          selectedProcesses.map((process) => ({
            production_flow_id: productionFlow.id,
            departament_id: process.departament_id,
            process_id: process.id,
            sequence: process.sequence,
          })),
        );
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
      processNames: defaultSelectedProcesses.map((process) => process.name) || [],
    });
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
          <ProductionFlowProcessesField
            form={form}
            defaultProcesses={defaultSelectedProcesses}
            selectedProcesses={selectedProcesses}
            onSelect={setSelectedProcesses}
          />
        )}
      </FieldGroup>

      <div
        id="create-product-form-buttons"
        className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end"
      >
        <ClearButton
          label="Resetar"
          isLoading={isPending}
          onclick={() => resetFormToDefaultValues()}
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
