import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useDialog from "@/hooks/dialog/useDialog"
import useDeleteProduct from "@/hooks/product/useDeleteProduct"
import type { ProductPopulated } from "@/types/database.type"
import handleFormError from "@/utils/formErrorHandler"
import { toast } from "sonner"

type DeleteProductDialogProps = {
    product: ProductPopulated
    children?: React.ReactNode
}


export default function DeleteProductDialog({ product, children }: DeleteProductDialogProps) {
    const { closeDialog } = useDialog()
    const { mutateAsync, isPending } = useDeleteProduct()


    const handleDelete = async () => {
        try {
            await mutateAsync({ id: product.id })
            toast.success("Produto excluído com sucesso!")
            closeDialog("delete-product")

        } catch (error) {
            handleFormError(error, { default: "Erro ao excluir produto. Tente novamente." })
        }

    }

    return <CustomDialog
        id="delete-product"
        title="Excluir produto"
        trigger={children}>

        <div className="flex flex-col gap-2">
            <p>
                Tem certeza que deseja excluir o produto <strong>{product.name}</strong>?
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