import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Trash2Icon, BanIcon, Edit2Icon, InfoIcon } from "lucide-react";
import DeleteMovimentationDialog from "../dialogs/DeleteMovimentationDialog";
import { MovimentationPopulated } from "@/types/database.type";
import CancelMovimentationDialog from "../dialogs/CancelMovimentationDialog";
import EditMovimentationDialog from "../dialogs/EditMovimentationDialog";
import Link from "next/link";

type MovimentationTableDropdownMenuProps = {
  movimentation: MovimentationPopulated;
};

export function MovimentationTableDropdownMenu({
  movimentation,
}: MovimentationTableDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        <Link href={`/movimentations/${movimentation.id}`}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InfoIcon />
            Mais detalhes
          </DropdownMenuItem>
        </Link>

        {movimentation.status == "PENDING" && (
          <EditMovimentationDialog movimentation={movimentation}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditMovimentationDialog>
        )}

        {movimentation.status !== "CANCELLED" && (
          <CancelMovimentationDialog movimentation={movimentation}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <BanIcon />
              Cancelar
            </DropdownMenuItem>
          </CancelMovimentationDialog>
        )}

        <DeleteMovimentationDialog movimentation={movimentation}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash2Icon />
            Excluir
          </DropdownMenuItem>
        </DeleteMovimentationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
