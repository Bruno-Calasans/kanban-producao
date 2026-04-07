"use client"


import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import MoveButton from "@/components/custom/buttons/MoveButton"
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation"
import { useEffect, useState } from "react"
import { Departament, Process, ProductPopulated, ResponsibleWithDepartament } from "@/types/database.type"
import CantMoveProductWarn from "@/components/movimentation/CantMoveProductWarn"
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField"
import { defaultMovimentationFormValues, useAppForm, formSchema } from "./movimentationFormContext"
import handleFormError from "@/utils/formErrorHandler"
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup"
import { MovimentationDepartamentFieldGroup } from "./fields/MovimentationDepartamentFieldGroup"
import { MovimentationProcessFieldGroup } from "./fields/MovimentationProcessFieldGroup"
import useDialog from "@/hooks/dialog/useDialog"
import { MovimentationResponsibleField } from "./fields/MovimentationResponsibleField"


export default function CreateMovimentationForm() {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useCreateMovimentation()
    const [product, setProduct] = useState<ProductPopulated | undefined>()
    const [departamentOrigin, setDepartamentOrigin] = useState<Departament | undefined>()
    const [departamentDestination, setDepartamentDestination] = useState<Departament | undefined>()
    const [processOrigin, setProcessOrigin] = useState<Process | undefined>()
    const [processDestination, setProcessDestination] = useState<Process | undefined>()
    // const [responsible, setResponsible] = useState<ResponsibleWithDepartament | undefined>()

    const form = useAppForm({
        defaultValues: defaultMovimentationFormValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            if (!product || !departamentOrigin || !departamentDestination || !processOrigin || !processDestination)
                return

            const { amount } = value
            try {
                await mutateAsync({
                    product_id: product.id,
                    amount,
                    departament_origin_id: departamentOrigin.id,
                    departament_destination_id: departamentDestination.id,
                    process_origin_id: processOrigin.id,
                    process_destination_id: processDestination.id,
                })
                toast.success("Produto movimentado com sucesso!")
                form.reset()
                closeDialog("create-movimentation")

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível movimentar."
                })
            }

        },
    })

    const resetForm = () => {
        form.reset()
        setProduct(undefined)
        setDepartamentOrigin(undefined)
        setDepartamentDestination(undefined)
        setProcessOrigin(undefined)
        setProcessDestination(undefined)
    }

    const canMoveProuct = product &&
        product.max_amount &&
        product.max_amount > 0 &&
        product.departament &&
        product.process

    return (
        <form
            id="create-movimentation-form"
            className="flex flex-col gap-6"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <MovimentationProductNameField
                form={form}
                selectedProduct={product}
                onChange={setProduct}
            />

            {/* Aviso se produto não tem quantidade para mover */}
            {
                product && !canMoveProuct && <CantMoveProductWarn product={product} />
            }

            {/* Campo de quantidade, checkbox  de quantidade máxima */}
            {canMoveProuct && product && (
                <MovimentationAmountFieldGroup form={form} selectedProduct={product} />
            )}


            {/* Campo do departamento */}
            {canMoveProuct && (
                <MovimentationDepartamentFieldGroup
                    form={form}
                    selectedProduct={product}
                    originDepartament={departamentOrigin}
                    destinationDepartament={departamentDestination}
                    onChangeDepartamentOrigin={setDepartamentOrigin}
                    onChangeDepartamentDestination={setDepartamentDestination}
                />
            )}


            {canMoveProuct && departamentOrigin && departamentDestination && (
                <MovimentationProcessFieldGroup
                    form={form}
                    selectedProduct={product}
                    departamentOrigin={departamentOrigin}
                    departamentDestination={departamentDestination}
                    processOrigin={processOrigin}
                    processDestination={processDestination}
                    onChangeProcessOrigin={setProcessOrigin}
                    onChangeProcessDestination={setProcessDestination}
                />

            )}

            {/* {canMoveProuct && departamentDestination && (
                <MovimentationResponsibleField
                    form={form}
                    selectedDepartament={departamentDestination}
                    selectedResponsible={responsible}
                    onChangeResponsible={setResponsible}
                />

            )} */}

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                {/* <ClearButton isLoading={isPending} onclick={resetForm} /> */}
                <MoveButton isLoading={isPending} disabled={!form.store.state.isValid} />
            </div>
        </form>

    )
}
