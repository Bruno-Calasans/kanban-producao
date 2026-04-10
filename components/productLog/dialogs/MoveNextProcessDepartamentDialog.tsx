import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useGetNextProcesses from "@/hooks/departament/useGetNextDepartaments"
import useDialog from "@/hooks/dialog/useDialog"
import { useDeleteProductLog } from "@/hooks/productLog/useDeleteProductLog"
import type { ProductLogPopulated } from "@/types/database.type"
import handleFormError from "@/utils/errorHandler"
import { toast } from "sonner"

type MoveNextProcessDepartamentDialogProps = {
    productLog: ProductLogPopulated
}


export default function MoveNextProcessDepartamentDialog({ productLog }: MoveNextProcessDepartamentDialogProps) {
    const { closeDialog } = useDialog()
    const { data: nextProcesses, isPending: isProcessesPending } = useGetNextProcesses(productLog.product.id)
    const { data: nextDepartaments, isPending: isDepartamentPending } = useGetNextProcesses(productLog.product.id)


    const handleDelete = async () => {
        try {
            toast.success("Registro excluído com sucesso!")
            closeDialog("delete-product-log")

        } catch (error) {
            handleFormError(error, { default: "Erro ao excluir produto. Tente novamente." })
        }

    }

    console.log("nextProcesses = ", nextProcesses)
    const isPending = isProcessesPending || isDepartamentPending

    return <CustomDialog
        id="delete-product-log"
        title="Mover próximo"
        trigger={(
            <p className="w-full">Teste</p>
        )}>

        <div className="flex flex-col gap-2">
            <p>
                Tem certeza que deseja excluir o produto <strong>{productLog.product.name}</strong>?
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