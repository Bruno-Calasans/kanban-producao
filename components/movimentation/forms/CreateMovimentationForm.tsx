"use client"


import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import MoveButton from "@/components/custom/buttons/MoveButton"
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation"
import { useEffect, useState } from "react"
import { Departament, Process, Product } from "@/types/database.type"
import CantMoveProductWarn from "@/components/movimentation/CantMoveProductWarn"
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField"
import { defaultMovimentationFormValues, useAppForm, formSchema } from "./movimentationFormContext"
import handleFormError from "@/utils/errorHandler"
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup"
import { MovimentationDepartamentFieldGroup } from "./fields/MovimentationDepartamentFieldGroup"
import { MovimentationProcessFieldGroup } from "./fields/MovimentationProcessFieldGroup"
import useDialog from "@/hooks/dialog/useDialog"


export default function CreateMovimentationForm() {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useCreateMovimentation()
    const [product, setProduct] = useState<Product | undefined>()
    const [fromDepartament, setFromDepartament] = useState<Departament | undefined>()
    const [toDepartament, setToDepartament] = useState<Departament | undefined>()
    const [fromProcess, setFromProcess] = useState<Process | undefined>()
    const [toProcess, setToProcess] = useState<Process | undefined>()

    const form = useAppForm({
        defaultValues: defaultMovimentationFormValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            if (!product || !fromDepartament || !toDepartament || !fromProcess || !toProcess)
                return

            const { amount } = value
            try {
                await mutateAsync({
                    product_id: product.id,
                    amount,
                    to_departament_id: fromDepartament.id,
                    from_departament_id: toDepartament.id,
                    to_process_id: fromProcess.id,
                    from_process_id: toProcess.id,
                })
                toast.success("Produto movimentado com sucesso!")
                closeDialog("create-movimentation")
                form.reset()

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível movimentar. Tente novamente"
                })
            }

        },
    })

    const resetForm = () => {
        form.reset()
        setProduct(undefined)
        setFromDepartament(undefined)
        setToDepartament(undefined)
        setFromProcess(undefined)
        setToProcess(undefined)
    }

    const canMoveProuct = product &&
        product.max_amount &&
        product.max_amount > 0

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
                    originDepartament={fromDepartament}
                    destinationDepartament={toDepartament}
                    onChangeDepartamentOrigin={setFromDepartament}
                    onChangeDepartamentDestination={setToDepartament}
                />
            )}


            {canMoveProuct && fromDepartament && toDepartament && (
                <MovimentationProcessFieldGroup
                    form={form}
                    selectedProduct={product}
                    departamentOrigin={fromDepartament}
                    departamentDestination={toDepartament}
                    processOrigin={fromProcess}
                    processDestination={fromProcess}
                    onChangeProcessOrigin={setFromProcess}
                    onChangeProcessDestination={setToProcess}
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
