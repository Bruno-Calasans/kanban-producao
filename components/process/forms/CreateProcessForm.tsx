"use client"

import { toast } from "sonner"
import ClearButton from "../../custom/buttons/ClearButton"
import ConfirmButton from "../../custom/buttons/ConfirmButton"
import useCreateProcess from "@/hooks/process/useCreateProcess"
import { FieldGroup } from "@/components/ui/field"
import { useState } from "react"
import { Departament } from "@/types/database.type"
import { defaultProcessFormValues, useAppForm, formSchema } from "./ProcessFormContext"
import handleFormError from "@/utils/formErrorHandler"
import { ProcessNameField } from "./fields/ProcessNameField"
import { ProcessOrderField } from "./fields/ProcessOrderField"
import { ProcessDepartamentField } from "./fields/ProcessDepartamentField"
import useDialog from "@/hooks/dialog/useDialog"


export default function CreateProcessForm() {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useCreateProcess()
    const [selectedDepartament, setSelectedDepartament] = useState<Departament | undefined>()

    const form = useAppForm({
        defaultValues: defaultProcessFormValues,
        validators: {
            onSubmit: formSchema,
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                if (!selectedDepartament) return
                await mutateAsync({
                    name: value.name,
                    order: value.order,
                    departament_id: selectedDepartament.id
                })
                toast.success("Processo criado com sucesso!")
                form.reset()
                closeDialog("create-process")

            } catch (error) {
                handleFormError(error, {
                    duplicate: "Erro: nome de processo já existe.",
                    default: "Erro: não foi possível criar o processo."
                })

            }

        },
    })

    return (
        <form
            id="create-rocess-form"
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
                <ConfirmButton hiddenIcon isLoading={isPending} label="Criar processo" />
            </div>
        </form>

    )
}
