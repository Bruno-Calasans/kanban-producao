import CustomDialog from "@/components/custom/CustomDialog"
import CancelButton from "@/components/custom/buttons/CancelButton"
import DeleteButton from "@/components/custom/buttons/DeleteButton"
import useDeleteProduct from "@/hooks/product/useDeleteProduct"
import { toast } from "sonner"
import type { Product } from "@/types/database.type"

type DeleteProductDialogProps = {
    product: Product
    children?: React.ReactNode
}


export default function DeleteProductDialog({ product, children }: DeleteProductDialogProps) {
    const { mutateAsync, isPending } = useDeleteProduct()


    const handleDelete = async () => {
        try {
            await mutateAsync({ id: product.id })
            toast.success("Produto excluído com sucesso!")

        } catch (error) {
            toast.error("Erro ao excluir produto. Tente novamente.")
        }

    }

    return <CustomDialog
        title="Excluir produto"
        trigger={children}>

        <div className="flex flex-col gap-2">
            <p>
                Tem certeza que deseja excluir o produto <strong>{product.name}</strong>?
            </p>
            <p>
                Essa ação não pode ser desfeita. Todos os registros relacionados a esse produto serão afetados.
            </p>
            <p></p>
            <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
                <CancelButton isLoading={isPending} />
                <DeleteButton isLoading={isPending} onclick={handleDelete} />
            </div>
        </div>
    </CustomDialog>
}