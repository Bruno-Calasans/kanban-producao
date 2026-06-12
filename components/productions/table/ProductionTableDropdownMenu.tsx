import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Trash2Icon, BanIcon, Edit2Icon, InfoIcon } from "lucide-react";
import { ProductionPopulated } from "@/types/database.type";
import DeleteMovimentationDialog from "../dialogs/DeleteProductionDialog";
import CancelMovimentationDialog from "../dialogs/CancelProductionDialog";
import EditProductionDialog from "../dialogs/EditProductionDialog";
import Link from "next/link";

type ProductionTableDropdownMenuProps = {
  production: ProductionPopulated;
};

export function ProductionTableDropdownMenu({ production }: ProductionTableDropdownMenuProps) {
  const canEdit = production.status == "PENDING";
  const canDelete = production.status == "PENDING";
  const canCancel = production.status != "CANCELLED" && production.status != "COMPLETED";
  const hideProductionFlowField = production.status != "PENDING";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        <Link href={`/movimentations/${production.id}`}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InfoIcon />
            Mais detalhes
          </DropdownMenuItem>
        </Link>

        {canEdit && (
          <EditProductionDialog
            production={production}
            hideProductionFlowField={hideProductionFlowField}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditProductionDialog>
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
