"use client"

import { toast } from "sonner"
import ClearButton from "@/components/custom/buttons/ClearButton"
import { FieldGroup } from "@/components/ui/field"
import { useState } from "react"
import useUpdateProcess from "@/hooks/process/useUpdateProcess"
import SaveButton from "@/components/custom/buttons/SaveButton"
import useDialog from "@/hooks/dialog/useDialog"
import { formSchema, useAppForm } from "./ProcessFormContext"
import type { Departament, ProcessWithDepartament } from "@/types/database.type"
import handleFormError from "@/utils/formErrorHandler"
import { ProcessNameField } from "./fields/ProcessNameField"
import { ProcessDepartamentField } from "./fields/ProcessDepartamentField"
import { ProcessOrderField } from "./fields/ProcessOrderField"


type EditProcessFormProps = {
    process: ProcessWithDepartament
}

export default function EditProcessForm({ process }: EditProcessFormProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useUpdateProcess()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>(process.departament)

    const form = useAppForm({
        defaultValues: {
            name: process.name,
            order: process.order,
            departamentName: process.departament.name
        },
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                if (!selectedDepartament) return
                await mutateAsync({
                    id: process.id,
                    updateData: {
                        name: value.name,
                        order: value.order,
                        departament_id: selectedDepartament.id,
                    }
                })
                toast.success("Processo atualizado com sucesso!")
                form.reset()
                closeDialog("edit-process")

            } catch (error) {
                handleFormError(error, {
                    duplicate: "Erro: processo com esse nome já existe.",
                    default: "Erro: Não foi possível editar o processo."
                })

            }

        },
    })

    return (
        <form
            id="edit-process-form"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <ProcessNameField form={form} />
                <ProcessOrderField form={form} />
                <ProcessDepartamentField
                    form={form}
                    selectedDepartament={selectedDepartament}
                    onChange={setSelectedDepartament}
                />
            </FieldGroup>

            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <ClearButton isLoading={isPending} onclick={() => form.reset()} />
                <SaveButton isLoading={isPending} label="Salvar alterações" />
            </div>
        </form>

    )
}
