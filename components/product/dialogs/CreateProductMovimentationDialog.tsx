import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { ProductWithProductionFlow } from "@/types/database.type";
import { ArrowLeftRightIcon } from "lucide-react";
import CreateProductMovimentationForm from "../forms/CreateProductMovimentationForm";

type CreateProductMovimentationDialogProps = {
  product: ProductWithProductionFlow;
};

export default function CreateProductMovimentationDialog({
  product,
}: CreateProductMovimentationDialogProps) {
  return (
    <CustomDialog
      id="create-product-movimentation"
      title="Criar nova Movimentação de Produto"
      trigger={
        <Button disabled={!product.is_active} className="m-0" size="xs">
          <ArrowLeftRightIcon />
          Nova movimentação
        </Button>
      }
    >
      <CreateProductMovimentationForm product={product} />
    </CustomDialog>
  );
}
