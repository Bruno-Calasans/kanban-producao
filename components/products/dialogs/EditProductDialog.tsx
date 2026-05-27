import CustomDialog from "@/components/custom/CustomDialog";
import EditProductForm from "@/components/products/forms/EditProductForm";
import type { Product } from "@/types/database.type";

type EditProductDialogProps = {
  hideProductionFlowSelector?: boolean;
  product: Product;
  children?: React.ReactNode;
};

export default function EditProductDialog({ product, children }: EditProductDialogProps) {
  return (
    <CustomDialog id="edit-product" title="Editar produto" trigger={children}>
      <EditProductForm product={product} />
    </CustomDialog>
  );
}
