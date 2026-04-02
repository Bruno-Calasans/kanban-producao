"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import {
    FieldGroup,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useUpdateProduct from "@/hooks/product/useUpdateProduct"
import { useState } from "react"
import { defaultProductFormValues, formSchema, ProductSchema, useAppForm } from "./productFormContext"
import { ProductNameField } from "./fields/ProductNameField"
import { ProductOpField } from "./fields/ProductOpField"
import { ProductMaxAmountField } from "./fields/ProductMaxAmountField"
import { ProductDefaultCheckboxField } from "./fields/ProductDefaultCheckboxField"
import { ProductDefaultDepartamentField } from "./fields/ProductDefaultDepartamentField"
import { ProductDefaultProcessField } from "./fields/ProductDefaultProcessField"
import handleFormError from "@/utils/formErrorHandler"
import type { Departament, Process, ProductPopulated } from "@/types/database.type"
import { useStore } from "@tanstack/react-form-nextjs"
import useDialog from "@/hooks/dialog/useDialog"

type EditProductForm = {
    product: ProductPopulated
}

export default function EditProductForm({ product }: EditProductForm) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useUpdateProduct()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>()
    const [selectedProcess, setSelectedProcess] = useState<Process | undefined>()

    const form = useAppForm({
        defaultValues: {
            name: product.name,
            op: product.op || defaultProductFormValues.op,
            max_amount: product.max_amount || defaultProductFormValues.max_amount,
            defaultDepartament: product.departament ? product.departament.name : defaultProductFormValues.defaultDepartamentName,
            defaultProcessName: product.process ? product.process.name : defaultProductFormValues.defaultProcessName,
            useDefault: !!product.departament && !!product.process
        } as ProductSchema,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value: inputData }) => {
            try {
                const { name, op, max_amount } = inputData
                await mutateAsync({
                    id: product.id, updateData: {
                        name,
                        op,
                        max_amount,
                        departament_id: product.departament ? product.departament.id : null,
                        process_id: product.process ? product.process.id : null,
                        responsible_id: null,
                    }
                })
                toast.success("Produto atualizado com sucesso!")
                form.reset()
                closeDialog("edit-product")

            } catch (error) {
                handleFormError(error, {
                    duplicate: "Erro: já existe um produto com esse nome.",
                    default: "Erro: Não foi possível atualizar o produto."
                })
            }

        },
    })

    return (
        <form
            id="product-form"
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

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <SaveButton
                    isLoading={isPending}
                    label="Salvar alterações"
                />
            </div>
        </form>

    )
}
