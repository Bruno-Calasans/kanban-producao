import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { defaultProductLogFormValues, withForm } from "../productLogFormContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductPopulated } from "@/types/database.type";
import { ChangeEvent, useEffect } from "react";


type ProductLogAmountFieldProps = {
    selectedProduct: ProductPopulated
    totalAmountDone: number
}

export const ProductLogAmountField = withForm({
    defaultValues: defaultProductLogFormValues,
    props: {} as ProductLogAmountFieldProps,
    render({ form, selectedProduct, totalAmountDone }) {
        return (
            <FieldGroup>
                {/* Campo de quantidade de peças a serem registradas */}
                <form.Subscribe selector={state => state.values.useMaxAmount}>
                    {(useMaxAmount) => {

                        const maxAmount = selectedProduct.max_amount - totalAmountDone

                        const handleAmountChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
                            let amount = Number(e.target.value)
                            amount = Math.min(amount, maxAmount)
                            form.setFieldValue("amount", amount)
                        }

                        useEffect(() => {
                            if (useMaxAmount) {
                                form.setFieldValue("amount", maxAmount)
                            }
                        }, [useMaxAmount, selectedProduct.max_amount])

                        return <form.Field
                            name="amount"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Quantidade</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={handleAmountChange}
                                            aria-invalid={isInvalid}
                                            placeholder="Quantidade registrada"
                                            autoComplete="off"
                                            type="number"
                                            disabled={useMaxAmount}
                                        />
                                        <FieldDescription>
                                            Quantidade disponível: {maxAmount}
                                        </FieldDescription>

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />

                    }

                    }

                </form.Subscribe>

                {/* Campo checkbox para registrar todas as peças disponíveis */}
                <form.Field
                    name="useMaxAmount"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="use-max-amount-product-checkbox"
                                    name="use-max-amount-product-checkbox"
                                    checked={field.state.value}
                                    onCheckedChange={checked => field.handleChange(checked as boolean)}

                                />
                                <FieldContent>
                                    <FieldLabel htmlFor="use-max-amount-product-checkbox">
                                        Usar quantidade disponível
                                    </FieldLabel>
                                </FieldContent>
                            </Field>
                        )
                    }}
                />

            </FieldGroup>
        )
    }
})