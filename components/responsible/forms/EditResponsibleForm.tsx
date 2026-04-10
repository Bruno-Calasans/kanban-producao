"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import { FieldGroup } from "@/components/ui/field"
import { useState } from "react"
import { Departament, ResponsibleWithDepartament } from "@/types/database.type"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useUpdateResponsible from "@/hooks/responsible/useUpdateResponsible"
import { ResponsibleNameField } from "./fields/ResponsibleNameField"
import { ResponsibleDepartamentName } from "./fields/ResponsibleDepartamentName"
import useDialog from "@/hooks/dialog/useDialog"
import errorHandler from "@/utils/errorHandler"
import { useAppForm, formSchema, ResponsibleFormSchema } from "./responsibleFormContext"


type CreateResponsibleFormProps = {
    responsible: ResponsibleWithDepartament
}


export default function UpdateResponsibleForm({ responsible }: CreateResponsibleFormProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useUpdateResponsible()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>()

    const form = useAppForm({
        defaultValues: {
            name: responsible.name,
            departamentName: responsible.departament.name
        } as ResponsibleFormSchema,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                if (!selectedDepartament) return
                await mutateAsync({
                    responsibleId: responsible.id,
                    updateData: {
                        departament_id: selectedDepartament.id,
                        name: value.name
                    }
                })
                toast.success("Responsável atualizado com sucesso!")
                closeDialog("edit-responsible")
                form.reset()

            } catch (error) {
                errorHandler(error, {
                    default: "Error: não foi possível editar o responsável."
                })

            }

        },
    })

    return (
        <form
            id="edit-responsible-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>

                <ResponsibleNameField form={form} />
                <ResponsibleDepartamentName
                    form={form}
                    selectedDepartament={selectedDepartament}
                    onDepartamentChange={setSelectedDepartament}
                />

            </FieldGroup>

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <SaveButton isLoading={isPending} />
            </div>
        </form>

    )
}
