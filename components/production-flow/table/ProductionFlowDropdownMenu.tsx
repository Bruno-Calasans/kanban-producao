import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductionFlow } from "@/types/database.type"
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react"
import DeleteProductionFlowDialog from "../dialogs/DeleteProductionFlowDialog"

type ProductionFlowDropdownMenuProps = {
    productionFlow: ProductionFlow
}

export default function ProductionFlowDropdownMenu({ productionFlow }: ProductionFlowDropdownMenuProps) {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVerticalIcon className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end">
            {/* <EditProductionFlowDialog productionFlow={productionFlow}>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <Edit2Icon />
                    Editar
                </DropdownMenuItem>
            </EditProductionFlowDialog>
 */}

            <DeleteProductionFlowDialog productionFlow={productionFlow}>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                    <Trash2Icon />
                    Excluir
                </DropdownMenuItem>
            </DeleteProductionFlowDialog>

        </DropdownMenuContent>
    </DropdownMenu>
}