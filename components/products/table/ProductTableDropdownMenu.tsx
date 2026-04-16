import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon, InfoIcon } from "lucide-react";
import EditProductDialog from "../dialogs/EditProductDialog";
import DeleteProductDialog from "../dialogs/DeleteProductDialog";
import { ProductWithProductionFlow } from "@/types/database.type";
import Link from "next/link";

type ProductTableDropdownMenuProps = {
  product: ProductWithProductionFlow;
};

export default function ProductTableDropdownMenu({ product }: ProductTableDropdownMenuProps) {
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

        <EditProductDialog product={product}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit2Icon />
            Editar
          </DropdownMenuItem>
        </EditProductDialog>

        <DeleteProductDialog product={product}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash2Icon />
            Excluir
          </DropdownMenuItem>
        </DeleteProductDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
