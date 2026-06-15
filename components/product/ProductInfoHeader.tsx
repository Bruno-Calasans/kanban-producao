import { Product, ProductionPopulated } from "@/types/database.type";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/custom/CustomDialog";
import { CheckIcon, Edit2Icon, Trash2Icon } from "lucide-react";
import EditProductForm from "@/components/products/forms/EditProductForm";
import DeleteProductDialog from "@/components/products/dialogs/DeleteProductDialog";
import useActiveProduct from "@/hooks/product/useActiveProduct";
import ActiveBadge from "@/components/custom/badges/ActiveBadge";
import GoToCalendarButton from "@/components/custom/buttons/GoToCalendarButton";
import CreateProductMovimentationDialog from "./dialogs/CreateProductProductionDialog";
import { InfoAlert } from "@/components/custom/alerts/InfoAlert";
import { CustomAlert } from "@/components/custom/alerts/CustomAlert";

type ProductInfoHeaderProps = {
  product: Product;
  productions: ProductionPopulated[];
};

export default function ProductInfoHeader({ product, productions }: ProductInfoHeaderProps) {
  const { toggleActive, isPending } = useActiveProduct({ product });

  const productId = product.id;
  const canEdit = product.is_active;
  const hideProductionFlowSelector = productions.length > 0;
  const canDeleteProduct = productions.length == 0;

  return (
    <div className="flex flex-col gap-2 justify-between mb-2">
      {/* Cabeçalho */}
      <div className="flex justify-between mb-0">
        <PageTitle>Produto</PageTitle>
        <div className="flex  justify-end items-end gap-1">
          <BackButton to="/products" label="Voltar à página de produtos" />
          <GoToCalendarButton to="/calendar/weekly" label="Ver calendário semanal" />
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-col gap-0.5 mb-0">
        <p>
          <strong>REF:</strong> {product.ref}
        </p>
        <p>
          <strong>Nome:</strong> {product.name}
        </p>
        <p>
          <strong>Num. de produções:</strong> {productions.length}
        </p>
        <p className="flex items-center-safe gap-1">
          <strong>Situação:</strong> <ActiveBadge isActive={product.is_active} />
        </p>
      </div>

      {/* Ações */}
      {product.is_active && (
        <div className="flex items-start mb-0 gap-2">
          {canEdit && (
            <>
              <CreateProductMovimentationDialog product={product} />
              <CustomDialog
                id={`edit-product-${productId}`}
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
            </>
          )}

          <Button
            id="toggle-active-button"
            className="m-0 bg-slate-500 hover:bg-slate-600"
            size="xs"
            onClick={toggleActive}
          >
            <CheckIcon />
            Desativar
          </Button>

          {canDeleteProduct && (
            <CustomDialog
              id={`delete-product-${productId}`}
              title="Excluir Produto"
              trigger={
                <Button variant="destructive" className="self-start m-0" size="xs">
                  <Trash2Icon />
                  Excluir
                </Button>
              }
            >
              <DeleteProductDialog product={product} />
            </CustomDialog>
          )}
        </div>
      )}

      {/* Alertas do produto */}
      <div id="product-alerts" className="flex flex-col gap-2 mb-0">
        {!product.is_active && (
          <CustomAlert
            title="Produto desativado"
            description="Ative-o para poder criar ou editar o produto e suas produções."
            actionLabel={
              <Button
                id="toggle-active-button"
                className="m-0 bg-slate-500 hover:bg-slate-600"
                size="xs"
                disabled={isPending}
              >
                <CheckIcon />
                Ativar
              </Button>
            }
            onAction={toggleActive}
            classNames={{
              container:
                "border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-900 dark:bg-slate-950 dark:text-slate-50",
            }}
          />
        )}

        {productions.length === 0 && product.is_active && (
          <InfoAlert
            title="Nenhuma produção criada"
            description='Clique no botão "Nova produção" para poder criar uma produção do produto.'
            actionLabel={<CreateProductMovimentationDialog product={product} />}
          />
        )}
      </div>
    </div>
  );
}
