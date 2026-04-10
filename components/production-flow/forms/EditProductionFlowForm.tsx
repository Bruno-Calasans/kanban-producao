"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import ConfirmButton from "@/components/custom/buttons/ConfirmButton"
import { defaultProductionFlowValues, formSchema, ProductionFlowSchema, useAppForm } from "./ProductionFlowFormContext"
import { FieldGroup } from "@/components/ui/field"
import errorHandler from "@/utils/errorHandler"
import { ProductionFlowNameField } from "./fields/ProductionFlowNameField"
import useCreateProductionFlow from "@/hooks/production-flow/useCreateProductionFlow"
import { ProductionFlowDescField } from "./fields/ProductionFlowDescField"
import { ProductionFlowProcessesField } from "./fields/ProductionFlowProcessesField"
import { useState } from "react"
import { Process, ProductionFlow } from "@/types/database.type"
import useCreateProductionFlowTemplate from "@/hooks/production-flow-template/useCreateProductionFlowTemplate"
import { useRouter } from "next/navigation"
import { ProductionFlowUseDefaultField } from "./fields/ProductionFlowUseDefaultField"
import useGetAllProductionFlowTemplates from "@/hooks/production-flow-template/useGetAllProductionFlowTemplateBy"
import useDeleteProductionFlowTemplates from "@/hooks/production-flow-template/useDeleteProductionFlowTemplates"
import useUpdateProductionFlow from "@/hooks/production-flow/useUpdateProductionFlow"


type CreateProductionFlowFormProps = {
    productionFlow: ProductionFlow
}

type ChangedFormValues = {
    nameChanged: boolean
    descChanged: boolean
    useDefaultChanged: boolean
    processesChanged: boolean
    hasAnyChange: boolean
}


export default function EditProductionFlowForm({ productionFlow }: CreateProductionFlowFormProps) {
    const router = useRouter()
    const { mutateAsync: updateProductionFlowAsync, isPending: isProductionFlowPending } = useUpdateProductionFlow()
    const { mutateAsync: createProductionFlowTemplateAsync } = useCreateProductionFlowTemplate()
    const { mutateAsync: deleteFlowTemplatesAsync } = useDeleteProductionFlowTemplates()
    const { data, isPending: isFlowTemplatesPending } = useGetAllProductionFlowTemplates(productionFlow.id)
    const [selectedProcesses, setSelectedProcesses] = useState<Process[]>([])
    const [changes, setChanges] = useState<ChangedFormValues>({ nameChanged: false, descChanged: false, useDefaultChanged: false, processesChanged: false, hasAnyChange: false })

    const productionFlowTemplates = data?.data || []
    const defaultSelectedProcesses = productionFlowTemplates.map((template) => template.process)
    const isPending = isProductionFlowPending || isFlowTemplatesPending


    const form = useAppForm({
        defaultValues: {
            name: productionFlow.name,
            desc: productionFlow.desc || "",
            useDefault: productionFlow.is_default || false,

        } as ProductionFlowSchema,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {

                const { nameChanged, descChanged, useDefaultChanged, processesChanged } = changes
                console.log("Mudanças detectadas:", changes)

                // atualiza informações básicas do fluxo de produção (nome, descrição, usar padrão) sem mudar os processos
                if (nameChanged || descChanged || useDefaultChanged) {
                    const { name, desc, useDefault } = value
                    await updateProductionFlowAsync({
                        flowtemplateId: productionFlow.id,
                        updateData: {
                            name,
                            desc,
                            is_default: !!useDefault
                        }
                    })
                }

                //  mudança apenas nos processos, sem mudança nas outras informações do fluxo de produção
                if (processesChanged) {
                    // remove processos antigos
                    const templateIdsToDelete = productionFlowTemplates.map(template => template.id)
                    await deleteFlowTemplatesAsync({
                        productionFlowTemplateIds: templateIdsToDelete
                    })

                    // criar novos processos do fluxo de produção com os processos selecionados
                    await createProductionFlowTemplateAsync(selectedProcesses.map((process) => ({
                        production_flow_id: productionFlow.id,
                        departament_id: process.departament_id,
                        process_id: process.id,
                        sequence: process.sequence
                    })))
                }

                toast.success("Fluxo de produção atualizado com sucesso!")
                router.push("/production-flow")

            } catch (error) {
                errorHandler(error, {
                    default: "Erro: não foi possível atualizar o fluxo de produção",
                    duplicate: "Erro: já existe outro fluxo de produção com esse nome. Escolha outro nome e tente novamente."
                })
            }

        },
    })

    const checkChanges = (processes: Process[]) => {
        const nameChanged = form.getFieldValue("name") !== productionFlow.name
        const descChanged = form.getFieldValue("desc") !== productionFlow.desc
        const useDefaultChanged = form.getFieldValue("useDefault") !== productionFlow.is_default
        const processesChanged = checkProcessesChanges(processes)

        return {
            nameChanged,
            descChanged,
            useDefaultChanged,
            processesChanged,
            hasAnyChange: nameChanged || descChanged || useDefaultChanged || processesChanged
        }
    }

    const checkProcessesChanges = (processes: Process[]) => {
        const processesChanged = JSON.stringify(processes.map(p => p.id).sort()) !==
            JSON.stringify(defaultSelectedProcesses.map(p => p.id).sort())

        return processesChanged
    }

    // Atualiza os processos selecionados e verifica mudanças a cada mudança de processo selecionado
    const handleSelectedProcesses = (processes: Process[]) => {
        setChanges(checkChanges(processes))
        setSelectedProcesses(processes)
    }

    // Verifica mudanças no formulário a cada mudança de valor ou processos selecionados
    // form.store.subscribe(state => {
    //     setChanges(checkChanges(selectedProcesses))
    //     console.log("Mudanças detectadas:", checkChanges(selectedProcesses))
    // })


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
                {!isFlowTemplatesPending && (
                    <ProductionFlowProcessesField
                        form={form}
                        onSelectedProcesses={handleSelectedProcesses}
                        defautlSelectedProcesses={defaultSelectedProcesses}
                    />
                )}
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
                    // disabled={!changes.hasAnyChange}
                    isLoading={isPending}
                    label="Salvar alterações"
                    loadingMsg="Salvando..."
                />
            </div>
        </form>

    )
}
