import { Button } from "@/components/ui/button";
import { Product } from "@/types/database.type";
import { PackageIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import CreateProductProductionForm from "../forms/CreateProductProductionForm";

type CreateProductProductionDialogProps = {
  product: Product;
};

export default function CreateProductProductionDialog({
  product,
}: CreateProductProductionDialogProps) {
  return (
    <CustomDialog
      id={`create-movimentation-${product.id}`}
      title="Criar nova produção"
      trigger={
        <Button disabled={!product.is_active} className="m-0" size="xs">
          <PackageIcon />
          Nova produção
        </Button>
      }
    >
      <CreateProductProductionForm product={product} />
    </CustomDialog>
  );
}
