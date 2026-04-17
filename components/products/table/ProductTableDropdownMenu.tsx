import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit2Icon,
  EllipsisVerticalIcon,
  Trash2Icon,
  InfoIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import EditProductDialog from "../dialogs/EditProductDialog";
import DeleteProductDialog from "../dialogs/DeleteProductDialog";
import { ProductWithProductionFlow } from "@/types/database.type";
import Link from "next/link";
import useGetAllMovimentationsByProduct from "@/hooks/movimentation/useGetAllMovimentationsByProduct";
import useActiveProduct from "@/hooks/product/useActiveProduct";

type ProductTableDropdownMenuProps = {
  product: ProductWithProductionFlow;
};

export default function ProductTableDropdownMenu({ product }: ProductTableDropdownMenuProps) {
  const { toggleActive, isPending: isPendingUpdate } = useActiveProduct({ product });
  const { data, isPending: isProductMovimentationsPending } = useGetAllMovimentationsByProduct(
    product.id,
  );
  const movimentations = data?.data || [];

  const isPending = isPendingUpdate || isProductMovimentationsPending;
  const canEdit = !isPending && product.is_active;
  const canEditProductionFlow = !isPending && movimentations.length == 0;
  const canDeleteProduct = !isPending && movimentations.length == 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        <Link className="flex" href={`products/${product.id}`}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InfoIcon />
            Mais detalhes
          </DropdownMenuItem>
        </Link>

        {canEdit && (
          <EditProductDialog canEditProductionFlow={canEditProductionFlow} product={product}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditProductDialog>
        )}

        <DropdownMenuItem onSelect={toggleActive}>
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
        </DropdownMenuItem>

        {canDeleteProduct && (
          <DeleteProductDialog product={product}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteProductDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
