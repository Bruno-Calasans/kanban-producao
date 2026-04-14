import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon, Trash2Icon, BanIcon, Edit2Icon } from "lucide-react"
import DeleteMovimentationDialog from "../dialogs/DeleteMovimentationDialog"
import { MovimentationPopulated } from "@/types/database.type"
import CancelMovimentationDialog from "../dialogs/CancelMovimentationDialog"
import EditMovimentationDialog from "../dialogs/EditMovimentationDialog"



type MovimentationTableDropdownMenuProps = {
    movimentation: MovimentationPopulated
}

export function MovimentationTableDropdownMenu({ movimentation }: MovimentationTableDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="end">
                {movimentation.status !== "CANCELLED" && (
                    <CancelMovimentationDialog movimentation={movimentation}>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <BanIcon />
                            Cancelar
                        </DropdownMenuItem>
                    </CancelMovimentationDialog>
                )}

                {movimentation.status == "PENDING" && (
                    <EditMovimentationDialog movimentation={movimentation}>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <Edit2Icon />
                            Editar
                        </DropdownMenuItem>
                    </EditMovimentationDialog>
                )}

                <DeleteMovimentationDialog movimentation={movimentation}>
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <Trash2Icon />
                        Excluir
                    </DropdownMenuItem>
                </DeleteMovimentationDialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}