import { defaultProductFormValues, withForm } from "@/components/product/forms/productFormContext"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field } from "@/components/ui/field"
import { FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import Link from "next/link"

export const ProductDefaultCheckboxField = withForm({
    defaultValues: defaultProductFormValues,
    render({ form }) {
        return <form.Field
            name="useDefault"
            children={(field) => {
                return (
                    <Field
                        id="use-default-departament-process-checkbox"
                        orientation="horizontal"
                    >
                        <Checkbox
                            id="use-default-departament-process"
                            name="use-default-departament-process"
                            checked={field.state.value}
                            onCheckedChange={checked => field.handleChange(checked as boolean)}

                        />
                        <FieldContent>
                            <FieldLabel htmlFor="use-default-departament-process">
                                Usar padrão
                            </FieldLabel>
                            <FieldDescription>
                                Usar departamento e processo iniciais definidos nas
                                <Link href="/configuracao">
                                    <Button className="self-start p-0" variant="link">
                                        configurações
                                    </Button>
                                </Link>
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                )
            }}
        />
    }
})