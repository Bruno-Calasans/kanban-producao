import CustomDialog from "@/components/custom/CustomDialog"
import EditProductForm from "@/components/product/forms/EditProductForm"
import type { ProductPopulated } from "@/types/database.type"

type EditProductDialogProps = {
    product: ProductPopulated
    children?: React.ReactNode
}

export default function EditProductDialog({ product, children }: EditProductDialogProps) {
    return (
        <CustomDialog
            id="edit-product"
            title="Editar produto"
            trigger={children}
        >
            <EditProductForm product={product} />
        </CustomDialog>
    )

}