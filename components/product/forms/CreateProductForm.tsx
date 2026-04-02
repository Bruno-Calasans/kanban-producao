"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import ConfirmButton from "@/components/custom/buttons/ConfirmButton"
import useCreateProduct from "@/hooks/product/useCreateProduct"
import { useState } from "react"
import { Departament, Process } from "@/types/database.type"
import { ProductNameField } from "./fields/ProductNameField"
import { defaultProductFormValues, formSchema, useAppForm } from "./productFormContext"
import { ProductOpField } from "./fields/ProductOpField"
import { ProductMaxAmountField } from "./fields/ProductMaxAmountField"
import { ProductDefaultCheckboxField } from "./fields/ProductDefaultCheckboxField"
import { ProductDefaultDepartamentField } from "./fields/ProductDefaultDepartamentField"
import { ProductDefaultProcessField } from "./fields/ProductDefaultProcessField"
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import handleFormError from "@/utils/formErrorHandler"
import useDialog from "@/hooks/dialog/useDialog"


export default function CreateProductForm() {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useCreateProduct()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>()
    const [selectedProcess, setSelectedProcess] = useState<Process | undefined>()

    const form = useAppForm({
        defaultValues: defaultProductFormValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                const { name, max_amount, op } = value
                await mutateAsync({
                    name,
                    op,
                    max_amount,
                    departament_id: selectedDepartament ? selectedDepartament.id : null,
                    process_id: selectedProcess ? selectedProcess.id : null,
                    responsible_id: null,
                })
                toast.success("Produto criado com sucesso!")
                form.reset()
                closeDialog("create-product")

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível criar  o produto"
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
                <ProductNameField form={form} />
                <ProductOpField form={form} />
                <ProductMaxAmountField form={form} />
            </FieldGroup>

            <FieldSet className="mt-4">
                <FieldLegend>Departamento e Processo iniciais</FieldLegend>
                <ProductDefaultCheckboxField form={form} />
                <FieldGroup className="flex-row">
                    <ProductDefaultDepartamentField
                        form={form}
                        selectedDepartament={selectedDepartament}
                        onChange={setSelectedDepartament}
                    />
                    <ProductDefaultProcessField
                        form={form}
                        selectedDepartament={selectedDepartament}
                        selectedProcess={selectedProcess}
                        onChange={setSelectedProcess}
                    />
                </FieldGroup>
            </FieldSet>

            <div
                id="create-product-form-buttons"
                className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <ConfirmButton isLoading={isPending} label="Criar produto" loadingMsg="Criando..." />
            </div>
        </form>

    )
}
