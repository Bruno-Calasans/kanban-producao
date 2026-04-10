"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import ConfirmButton from "@/components/custom/buttons/ConfirmButton"
import { defaultProductionFlowValues, formSchema, useAppForm } from "./ProductionFlowFormContext"
import { FieldGroup } from "@/components/ui/field"
import errorHandler from "@/utils/errorHandler"
import { ProductionFlowNameField } from "./fields/ProductionFlowNameField"
import useCreateProductionFlow from "@/hooks/production-flow/useCreateProductionFlow"
import { ProductionFlowDescField } from "./fields/ProductionFlowDescField"
import { ProductionFlowProcessesField } from "./fields/ProductionFlowProcessesField"
import { useState } from "react"
import { Process } from "@/types/database.type"
import useCreateProductionFlowTemplate from "@/hooks/production-flow-template/useCreateProductionFlowTemplate"
import { useRouter } from "next/navigation"
import { ProductionFlowUseDefaultField } from "./fields/ProductionFlowUseDefaultField"


export default function CreateProductionFlowForm() {
    const { mutateAsync: productionAsync, isPending } = useCreateProductionFlow()
    const { mutateAsync: mutateTemplateAsync } = useCreateProductionFlowTemplate()
    const [selectedProcesses, setSelectedProcesses] = useState<Process[]>([])
    const router = useRouter()


    const form = useAppForm({
        defaultValues: defaultProductionFlowValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                const { name, desc, useDefault } = value
                const { data: createdProductionFlow } = await productionAsync({
                    name,
                    desc,
                    is_default: !!useDefault
                })

                await mutateTemplateAsync(selectedProcesses.map((process) => ({
                    production_flow_id: createdProductionFlow.id,
                    departament_id: process.departament_id,
                    process_id: process.id,
                    sequence: process.sequence
                })))

                toast.success("Fluxo de produção criado com sucesso!")
                router.push("/production-flow")

            } catch (error) {
                errorHandler(error, {
                    default: "Erro: não foi possível criar o fluxo de produção",
                    duplicate: "Erro: já existe fluxo de produção com esse nome. Escolha outro"
                })
            }

        },
    })

    return (
        <form
            id="create-product-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <ProductionFlowNameField form={form} />
                <ProductionFlowDescField form={form} />
                <ProductionFlowUseDefaultField form={form} />
                <ProductionFlowProcessesField
                    form={form}
                    onSelectedProcesses={setSelectedProcesses}
                />
            </FieldGroup>

            <div
                id="create-product-form-buttons"
                className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
                <ClearButton
                    isLoading={isPending}
                    onclick={() => form.reset()}
                />
                <ConfirmButton
                    hiddenIcon
                    isLoading={isPending}
                    label="Criar Fluxo de Produção"
                    loadingMsg="Criando..."
                />
            </div>
        </form>

    )
}
