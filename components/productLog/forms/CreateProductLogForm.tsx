"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import ConfirmButton from "@/components/custom/buttons/ConfirmButton"
import { useState } from "react"
import { defaultProductLogFormValues, formSchema, useAppForm } from "./productLogFormContext"
import { FieldGroup } from "@/components/ui/field"
import handleFormError from "@/utils/formErrorHandler"
import useDialog from "@/hooks/dialog/useDialog"
import useCreateProductLog from "@/hooks/productLog/useCreateProductLog"
import { ProductLogProductNameField } from "./fields/ProductLogProductNameField"
import { ProductPopulated, Status } from "@/types/database.type"
import { ProductLogAmountField } from "./fields/ProductLogAmountField"
import { ProductLogHoursField } from "./fields/ProductLogHoursField"
import { ProductCurrentSituation } from "../ProductCurrentSituation"
import useGetTotalAmountDone from "@/hooks/productLog/useGetTotalAmountDone"
import Loader from "@/components/custom/Loader"


export default function CreateProductLogForm() {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending: isCreateProductLogPending } = useCreateProductLog()
    const [product, setProduct] = useState<ProductPopulated | undefined>()
    const { data, isPending: isTotalAmountPending } = useGetTotalAmountDone({
        product_id: product?.id,
        departament_id: product?.departament?.id,
        process_id: product?.process?.id
    })

    // quantidade feita até agora
    const totalAmountDone = data || 0
    const canLog = product &&
        product.max_amount > 0 &&
        totalAmountDone < product.max_amount

    const getStatus = (remainingAmount: number): Status => {
        if (remainingAmount == 0) return "PROCESSADO"
        return "PROCESSANDO"
    }

    const calcRemainingAmount = (maxAmount: number, amount: number) => {
        const amountNow = totalAmountDone + amount
        return Math.max(maxAmount - amountNow, 0)
    }

    const form = useAppForm({
        defaultValues: defaultProductLogFormValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            if (!product || !product.departament || !product.process) return

            const { amount, startHour, endHour } = value
            const remainingAmount = calcRemainingAmount(product.max_amount, amount)
            const status = getStatus(remainingAmount)

            try {
                mutateAsync({
                    product_id: product.id,
                    departament_id: product.departament.id,
                    process_id: product.process.id,
                    start_hour: startHour,
                    end_hour: endHour,
                    remaining_amount: remainingAmount,
                    amount,
                    status,
                })

                toast.success("Registro criado com sucesso!")
                closeDialog("create-product-log")
                form.reset()

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível criar o registro do produto."
                })
            }

        },
    })

    if (product && isTotalAmountPending) return <Loader title="Carregando dados do produto" />


    return (
        <form
            id="create-product-log-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                {product && <ProductCurrentSituation
                    product={product}
                    totalAmountDone={totalAmountDone}
                />}

                <ProductLogProductNameField
                    form={form}
                    selectedProduct={product}
                    onChangeProduct={setProduct}
                />

                {canLog && <ProductLogAmountField
                    form={form}
                    selectedProduct={product}
                    totalAmountDone={totalAmountDone}
                />}

                {canLog && <ProductLogHoursField form={form} />}
            </FieldGroup>

            {canLog && (
                <div
                    id="create-product-log-form-buttons"
                    className="flex flex-row mt-4 not-only:p-2 gap-2 justify-end">
                    <ClearButton
                        isLoading={isCreateProductLogPending}
                        onclick={() => form.reset()}
                    />
                    <ConfirmButton
                        hiddenIcon
                        isLoading={isCreateProductLogPending}
                        label="Criar registro"
                        loadingMsg="Criando..."
                    />
                </div>
            )}
        </form>

    )
}
