import CustomDialog from "@/components/custom/CustomDialog";
import EditProductForm from "@/components/products/forms/EditProductForm";
import type { Product, ProductWithProductionFlow } from "@/types/database.type";

type EditProductDialogProps = {
  hideProductionFlowSelector?: boolean;
  product: ProductWithProductionFlow;
  children?: React.ReactNode;
};

export default function EditProductDialog({
  product,
  hideProductionFlowSelector,
  children,
}: EditProductDialogProps) {
  return (
    <CustomDialog id="edit-product" title="Editar produto" trigger={children}>
      <EditProductForm hideProductionFlowSelector={hideProductionFlowSelector} product={product} />
    </CustomDialog>
  );
}
