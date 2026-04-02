"use client"

import { toast } from "sonner"
import ClearButton from "@/components//custom/buttons/ClearButton"
import useUpdateDepartament from "@/hooks/departament/useUpdateDepartament"
import SaveButton from "@/components/custom/buttons/SaveButton"
import type { Departament } from "@/types/database.type"
import { FieldGroup } from "@/components/ui/field"
import { useAppForm, formSchema } from "./departamentFormContext"
import handleFormError from "@/utils/formErrorHandler"
import { DepartamentNameField } from "./fields/DepartamentNameField"
import { DepartamentOrderField } from "./fields/DepartamentOrderField"
import useDialog from "@/hooks/dialog/useDialog"

type DepartamentFormProps = {
    departament: Departament
}

export default function EditDepartamentForm({ departament }: DepartamentFormProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useUpdateDepartament()

    const form = useAppForm({
        defaultValues: {
            name: departament.name,
            order: departament.order,
        },
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                await mutateAsync({ id: departament.id, updateData: value })
                toast.success("Departamento atualizado com sucesso!")
                form.reset()
                closeDialog("delete-departament")

            } catch (error) {
                handleFormError(error, {
                    default: "Erro: não foi possível atualizar o departamento."
                })
            }

        },
    })

    return (
        <form
            id="edit-departament-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <DepartamentNameField form={form} />
                <DepartamentOrderField form={form} />
            </FieldGroup>

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <SaveButton isLoading={isPending || !form.state.isValid} />
            </div>
        </form>

    )
}
