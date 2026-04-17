import { Product, ProductWithProductionFlow } from "@/types/database.type";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/custom/CustomDialog";
import CreateMovimentationForm from "@/components/movimentations/forms/CreateMovimentationForm";
import { ArrowLeftRightIcon, Edit2Icon, Trash2Icon } from "lucide-react";
import EditProductForm from "@/components/products/forms/EditProductForm";
import DeleteProductDialog from "@/components/products/dialogs/DeleteProductDialog";

type ProductInfoHeaderProps = {
  product: ProductWithProductionFlow;
};

export default function ProductInfoHeader({ product }: ProductInfoHeaderProps) {
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>Informações do Produto</PageTitle>
        <BackButton to="/products" label="Voltar à página de produtos" />
      </div>

      <div className="flex flex-col gap-0.5 mb-4">
        <p>
          <strong>Nome:</strong> {product.name}
        </p>
        <p>
          <strong>Número de OP:</strong> {product.op}
        </p>
        <p>
          <strong>Fluxo de Produção:</strong> {product.production_flow.name}
        </p>
      </div>

      {/* Dialogs */}
      <div className="flex mb-4 gap-2">
        <CustomDialog
          id="create-movimentation"
          title="Criar movimentação"
          trigger={
            <Button className="m-0" size="xs">
              <ArrowLeftRightIcon />
              Nova movimentação
            </Button>
          }
        >
          <CreateMovimentationForm defaultProduct={product} />
        </CustomDialog>

        <CustomDialog
          id="edit-product"
          title="Editar Produto"
          trigger={
            <Button className="m-0" size="xs">
              <Edit2Icon />
              Editar
            </Button>
          }
        >
          <EditProductForm product={product} />
        </CustomDialog>

        <CustomDialog
          id="delete-product"
          title="Excluir Produto"
          trigger={
            <Button variant="destructive" className="m-0" size="xs">
              <Trash2Icon />
              Excluir
            </Button>
          }
        >
          <DeleteProductDialog product={product} />
        </CustomDialog>
      </div>
    </div>
  );
}
