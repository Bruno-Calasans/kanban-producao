import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import DeleteProcessDialog from "../dialogs/DeleteProcessDialog"
import EditProcessDialog from "../dialogs/EditProcessDialog"
import { ProcessWithDepartament } from "@/types/database.type"

type ProcessDropdownMenuProps = {
    process: ProcessWithDepartament
}

export default function ProcessDropdownMenu({ process }: ProcessDropdownMenuProps) {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVerticalIcon className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end">
            <EditProcessDialog process={process}>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <Edit2Icon />
                    Editar
                </DropdownMenuItem>
            </EditProcessDialog>

            <DeleteProcessDialog process={process}>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <Trash2Icon />
                    Excluir
                </DropdownMenuItem>
            </DeleteProcessDialog>

        </DropdownMenuContent>
    </DropdownMenu>
}