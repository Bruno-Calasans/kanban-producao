import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Trash2Icon, BanIcon, Edit2Icon, InfoIcon } from "lucide-react";
import { ProductionPopulated } from "@/types/database.type";
import Link from "next/link";
import DeleteMovimentationDialog from "@/components/productions/dialogs/DeleteProductionDialog";
import CancelMovimentationDialog from "@/components/productions/dialogs/CancelProductionDialog";
import EditMovimentationDialog from "@/components/productions/dialogs/EditProductionDialog";

type ProductProductionDropdownMenuProps = {
  production: ProductionPopulated;
};

export function ProductProductionDropdownMenu({ production }: ProductProductionDropdownMenuProps) {
  const { status, product } = production;

  const canEdit = status == "PENDING";
  const canDelete = status == "PENDING";
  const canCancel = status != "CANCELLED" && status != "COMPLETED";
  const hideProductionFlowField = status != "PENDING";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        <Link href={`/productions/${production.id}`}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InfoIcon />
            Mais detalhes
          </DropdownMenuItem>
        </Link>

        {canEdit && (
          <EditMovimentationDialog
            production={production}
            hideProductionFlowField={hideProductionFlowField}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditMovimentationDialog>
        )}

        {canCancel && (
          <CancelMovimentationDialog production={production}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <BanIcon />
              Cancelar
            </DropdownMenuItem>
          </CancelMovimentationDialog>
        )}

        {canDelete && (
          <DeleteMovimentationDialog production={production}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteMovimentationDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
