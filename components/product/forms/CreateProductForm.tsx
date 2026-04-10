"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import ConfirmButton from "@/components/custom/buttons/ConfirmButton"
import useCreateProduct from "@/hooks/product/useCreateProduct"
import { ProductNameField } from "./fields/ProductNameField"
import { defaultProductFormValues, formSchema, useAppForm } from "./productFormContext"
import { ProductOpField } from "./fields/ProductOpField"
import { ProductMaxAmountField } from "./fields/ProductMaxAmountField"
import { FieldGroup } from "@/components/ui/field"
import errorHandler from "@/utils/errorHandler"
import useDialog from "@/hooks/dialog/useDialog"


export default function CreateProductForm() {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useCreateProduct()

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
                    max_amount
                })
                toast.success("Produto criado com sucesso!")
                closeDialog("create-product")
                form.reset()

            } catch (error) {
                errorHandler(error, {
                    default: "Erro: não foi possível criar  o produto",
                    duplicate: "Erro: já existe produto com esse nome. Escolha outro"
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
                    label="Criar produto"
                    loadingMsg="Criando..."
                />
            </div>
        </form>

    )
}
