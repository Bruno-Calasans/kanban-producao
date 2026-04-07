import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useDialog from "@/hooks/dialog/useDialog"
import { useDeleteProductLog } from "@/hooks/productLog/useDeleteProductLog"
import type { ProductLogPopulated } from "@/types/database.type"
import handleFormError from "@/utils/formErrorHandler"
import { toast } from "sonner"

type DeleteProductLogDialogProps = {
    productLog: ProductLogPopulated
    children?: React.ReactNode
}


export default function DeleteProductLogDialog({ productLog, children }: DeleteProductLogDialogProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useDeleteProductLog()


    const handleDelete = async () => {
        try {
            await mutateAsync({ productlogId: productLog.id })
            toast.success("Registro excluído com sucesso!")
            closeDialog("delete-product-log")

        } catch (error) {
            handleFormError(error, { default: "Erro ao excluir produto. Tente novamente." })
        }

    }

    return <CustomDialog
        id="delete-product-log"
        title="Excluir produto"
        trigger={children}>

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