import { Movimentation, ProductWithProductionFlow } from "@/types/database.type";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/custom/CustomDialog";
import CreateMovimentationForm from "@/components/movimentations/forms/CreateMovimentationForm";
import { ArrowLeftRightIcon, CheckIcon, Edit2Icon, Trash2Icon, XIcon } from "lucide-react";
import EditProductForm from "@/components/products/forms/EditProductForm";
import DeleteProductDialog from "@/components/products/dialogs/DeleteProductDialog";
import useActiveProduct from "@/hooks/product/useActiveProduct";
import ActiveBadge from "../custom/badges/ActiveBadge";

type ProductInfoHeaderProps = {
  product: ProductWithProductionFlow;
  movimentations: Movimentation[];
};

export default function ProductInfoHeader({ product, movimentations }: ProductInfoHeaderProps) {
  const { toggleActive, isPending } = useActiveProduct({ product });

  const canEdit = product.is_active;
  const canEditProductionFlow = movimentations.length == 0;
  const canDeleteProduct = movimentations.length == 0;

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex justify-between">
        <PageTitle>Informações do Produto</PageTitle>
        <BackButton to="/products" label="Voltar à página de produtos" />
      </div>

      {/* Informações do Produto */}
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
        <p className="flex items-center-safe gap-1">
          <strong>Situação:</strong> <ActiveBadge isActive={product.is_active} />
        </p>
      </div>

      {/* Dialogs */}
      <div className="flex items-center-safe mb-4 gap-2">
        {canEdit && (
          <>
            <CustomDialog
              id="create-movimentation"
              title="Criar movimentação"
              trigger={
                <Button disabled={!product.is_active} className="m-0" size="xs">
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
              <EditProductForm canEditProductionFlow={canEditProductionFlow} product={product} />
            </CustomDialog>
          </>
        )}

        <Button
          id="toggle-active-button"
          onClick={toggleActive}
          className="m-0 bg-slate-500 hover:bg-slate-600"
          size="xs"
        >
          {product.is_active ? (
            <>
              <XIcon />
              Desativar
            </>
          ) : (
            <>
              <CheckIcon />
              Ativar
            </>
          )}
        </Button>

        {canDeleteProduct && (
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
        )}
      </div>
    </div>
  );
}
