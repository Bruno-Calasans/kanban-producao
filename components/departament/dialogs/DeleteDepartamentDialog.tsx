import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useDeleteDepartament from "@/hooks/departament/useDeleteDepartament"
import { toast } from "sonner"
import type { Departament } from "@/types/database.type"


type DeleteDepartamentDialogProps = {
    departament: Departament
    children?: React.ReactNode
}


export default function DeleteDepartamentDialog({ departament, children }: DeleteDepartamentDialogProps) {
    const { mutateAsync, isPending } = useDeleteDepartament()


    const handleDelete = async () => {
        try {
            await mutateAsync({ id: departament.id })
            toast.success("Departamento excluído com sucesso!")

        } catch (error) {
            toast.error("Erro ao excluir departamento. Tente novamente.")
        }
    }

    return <CustomDialog
        id="delete-departament"
        title="Excluir departamento"
        trigger={children}>

        <div className="flex flex-col gap-2">
            <p>
                Tem certeza que deseja excluir o departamento <strong>{departament.name}</strong>?
            </p>
            <p>
                Essa ação não pode ser desfeita.
            </p>
            <p></p>
            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <CancelButton isLoading={isPending} />
                <DeleteButton isLoading={isPending} onclick={handleDelete} />
            </div>
        </div>
    </CustomDialog>
}