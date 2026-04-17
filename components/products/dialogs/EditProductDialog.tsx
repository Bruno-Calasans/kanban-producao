import CustomDialog from "@/components/custom/CustomDialog";
import EditProductForm from "@/components/products/forms/EditProductForm";
import type { Product, ProductWithProductionFlow } from "@/types/database.type";

type EditProductDialogProps = {
  canEditProductionFlow?: boolean;
  product: ProductWithProductionFlow;
  children?: React.ReactNode;
};

export default function EditProductDialog({
  product,
  canEditProductionFlow,
  children,
}: EditProductDialogProps) {
  return (
    <CustomDialog id="edit-product" title="Editar produto" trigger={children}>
      <EditProductForm canEditProductionFlow={canEditProductionFlow} product={product} />
    </CustomDialog>
  );
}
