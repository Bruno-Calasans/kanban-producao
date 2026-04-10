"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import {
    FieldGroup,
} from "@/components/ui/field"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useUpdateProduct from "@/hooks/product/useUpdateProduct"
import { defaultProductFormValues, formSchema, ProductSchema, useAppForm } from "./productFormContext"
import { ProductNameField } from "./fields/ProductNameField"
import { ProductOpField } from "./fields/ProductOpField"
import { ProductMaxAmountField } from "./fields/ProductMaxAmountField"
import handleFormError from "@/utils/errorHandler"
import type { Product } from "@/types/database.type"
import useDialog from "@/hooks/dialog/useDialog"

type EditProductForm = {
    product: Product
}

export default function EditProductForm({ product }: EditProductForm) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useUpdateProduct()

    const form = useAppForm({
        defaultValues: {
            name: product.name,
            op: product.op || defaultProductFormValues.op,
            max_amount: product.max_amount || defaultProductFormValues.max_amount,
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
                    }
                })
                toast.success("Produto atualizado com sucesso!")
                closeDialog("edit-product")
                form.reset()

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

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton
                    isLoading={isPending}
                    onclick={() => form.reset()}
                />
                <SaveButton
                    label="Salvar alterações"
                    isLoading={isPending}
                    loadingMsg="Salvando..."
                    hiddenIcon
                />
            </div>
        </form>

    )
}
