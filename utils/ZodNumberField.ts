import * as z from "zod"


type ZodNumberFieldProps = {
    min: number
    minError?: string
    requiredError?: string
}

export default function ZodNumberField({ min, minError, requiredError }: ZodNumberFieldProps) {
    return z
        .preprocess((val) => {
            if (val === "") return undefined;
            const parsed = Number(val);
            return isNaN(parsed) ? val : parsed;
        }, z.coerce.number({
            error: requiredError || "Campo obrigatório"
        }).min(min, minError || `Valor mínimo é ${min}`)
        )
}