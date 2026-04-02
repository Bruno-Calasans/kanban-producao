"use client"


import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import MoveButton from "@/components/custom/buttons/MoveButton"
import useCreateMovimentation from "@/hooks/movimentation/useCreateMovimentation"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { useState } from "react"
import { Departament, Process, ProductPopulated } from "@/types/database.type"
import DepartamentProcessSelector from "@/components/custom/DepartamentProcessSelector"
import { ArrowRightIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import CantMoveProductWarn from "@/components/movimentation/CantMoveProductWarn"
import { MovimentationProductNameField } from "./fields/MovimentationProductNameField"
import { defaultMovimentationFormValues, useAppForm, formSchema } from "./movimentationFormContext"
import handleFormError from "@/utils/formErrorHandler"
import { MovimentationAmountFieldGroup } from "./fields/MovimentationAmountFieldGroup"
import { MovimentationDepartamentFieldGroup } from "./fields/MovimentationDepartamentFieldGroup"
import { MovimentationProcessFieldGroup } from "./fields/MovimentationProcessFieldGroup"


export default function CreateMovimentationForm() {
    const { mutateAsync, isPending } = useCreateMovimentation()
    const [product, setProduct] = useState<ProductPopulated | undefined>()
    const [departamentOrigin, setDepartamentOrigin] = useState<Departament | undefined>()
    const [departamentDestination, setDepartamentDestination] = useState<Departament | undefined>()
    const [processOrigin, setProcessOrigin] = useState<Process | undefined>()
    const [processDestination, setProcessDestination] = useState<Process | undefined>()

    const form = useAppForm({
        defaultValues: defaultMovimentationFormValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                await mutateAsync(value)
                toast.success("Produto movimentado com sucesso!")
                form.reset()

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível movimentar."
                })
            }

        },
    })

    const resetForm = () => {
        form.reset()
        setProduct(null)
        setDepartamentOrigin(null)
        setDepartamentDestination(null)
        setProcessOrigin(null)
        setProcessDestination(null)
    }

    const canMoveProuct = product &&
        product.max_amount &&
        product.max_amount > 0 &&
        product.departament &&
        product.process

    return (
        <form
            id="create-movimentation-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
            className="flex flex-col gap-6"
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


            {canMoveProuct && (
                <MovimentationProcessFieldGroup
                    form={form}
                    departamentOrigin={departamentOrigin}
                    departamentDestination={departamentDestination}
                    processOrigin={processOrigin}
                    processDestination={processDestination}
                    onChangeProcessOrigin={setProcessOrigin}
                    onChangeProcessDestination={setProcessDestination}
                />

            )}

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={resetForm} />
                <MoveButton isLoading={isPending || form.state.isValid} />
            </div>
        </form>

    )
}
