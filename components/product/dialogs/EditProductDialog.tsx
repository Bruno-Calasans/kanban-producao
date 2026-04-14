import CustomDialog from "@/components/custom/CustomDialog";
import EditProductForm from "@/components/product/forms/EditProductForm";
import type { Product, ProductWithProductionFlow } from "@/types/database.type";

type EditProductDialogProps = {
  product: ProductWithProductionFlow;
  children?: React.ReactNode;
};

export default function EditProductDialog({ product, children }: EditProductDialogProps) {
  return (
    <CustomDialog id="edit-product" title="Editar produto" trigger={children}>
      <EditProductForm product={product} />
    </CustomDialog>
  );
}
