import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { defaultMovimentationFormValues, withForm } from "../movimentationFormContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductPopulated } from "@/types/database.type";


type MovimentationAmountFieldGroupProps = {
    selectedProduct: ProductPopulated
}

export const MovimentationAmountFieldGroup = withForm({
    defaultValues: defaultMovimentationFormValues,
    props: {} as MovimentationAmountFieldGroupProps,
    render({ form, selectedProduct }) {

        return (
            <FieldGroup>

                {/* Campo de quantidade de peças a serem movimentadas */}
                <form.Subscribe selector={state => state.values.useMaxAmount}>

                    {(useMaxAmount) => (
                        <form.Field
                            name="amount"
                            children={(field) => {
                                let fieldValue = field.state.value
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid

                                if (useMaxAmount) {
                                    fieldValue = selectedProduct.max_amount || 1
                                }

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Quantidade</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={fieldValue}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                                            aria-invalid={isInvalid}
                                            placeholder="Quantidade a ser movimentada"
                                            autoComplete="off"
                                            type="number"
                                            disabled={useMaxAmount}
                                        />
                                        <FieldDescription>
                                            Quantidade disponível: {selectedProduct.max_amount}
                                        </FieldDescription>

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                    )}

                </form.Subscribe>

                {/* Campo checkbox para movimentar todas as peças disponíveis */}
                <form.Field
                    name="useMaxAmount"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="terms-checkbox-desc"
                                    name="terms-checkbox-desc"
                                    checked={field.state.value}
                                    onCheckedChange={checked => field.handleChange(checked as boolean)}

                                />
                                <FieldContent>
                                    <FieldLabel htmlFor="terms-checkbox-desc">
                                        Usar quantidade disponível
                                    </FieldLabel>
                                    <FieldDescription>
                                        Movimenta a quantidade máxima disponível de peças.
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        )
                    }}
                />

            </FieldGroup>
        )
    }
})