import CustomDialog from "@/components/custom/CustomDialog"
import { Product } from "@/types/database.type"
import EditProductForm from "@/components/product/forms/EditProductForm"


type EditProductDialogProps = {
    product: Product
    children?: React.ReactNode
}

export default function EditProductDialog({ product, children }: EditProductDialogProps) {
    return <CustomDialog
        title="Editar produto"
        trigger={children}>
        <EditProductForm product={product} />
    </CustomDialog>
}