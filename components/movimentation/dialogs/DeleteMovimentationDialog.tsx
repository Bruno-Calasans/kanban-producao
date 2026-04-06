import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useDeleteMovimentation from "@/hooks/movimentation/useDeleteMovimentation"
import { toast } from "sonner"
import type { MovimentationPopulated } from "@/types/database.type"
import useDialog from "@/hooks/dialog/useDialog"


type DeleteMovimentationDialogProps = {
    movimentation: MovimentationPopulated
    children?: React.ReactNode
}


export default function DeleteMovimentationDialog({ movimentation, children }: DeleteMovimentationDialogProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useDeleteMovimentation()


    const handleDelete = async () => {
        try {
            await mutateAsync({
                movimentationId: movimentation.id,
                productId: movimentation.product.id
            })
            toast.success("Movimentação excluída com sucesso!")
            closeDialog("delete-movimentation")

        } catch (error) {
            toast.error("Erro ao excluir movimentação. Tente novamente.")
        }

    }

    return (
        <CustomDialog
            id="delete-movimentation"
            title="Excluir movimentação"
            trigger={children}>

            <div className="flex flex-col gap-2">
                <p>
                    Tem certeza que deseja excluir a movimentação do produto <strong>{movimentation.product.name}</strong>?
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
    )
}