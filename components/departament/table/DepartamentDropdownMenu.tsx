"use client"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2Icon, EllipsisVerticalIcon, FlagIcon, Trash2Icon } from "lucide-react"
import EditDepartamentDialog from "../dialogs/EditDepartamentDialog"
import { Departament } from "@/types/database.type"
import DeleteDepartamentDialog from "../dialogs/DeleteDepartamentDialog"
import useSetDefaultDepartament from "@/hooks/departament/useSetDefaultDepartament"


type DepartamentDropdownMenuProps = {
    departament: Departament
}


export default function DepartamentDropdownMenu({ departament }: DepartamentDropdownMenuProps) {
    const { mutate, isPending } = useSetDefaultDepartament()


    const handleSetDefault = () => {
        if (isPending) return
        mutate({ id: departament.id })
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="end" className="w-fit">
                <EditDepartamentDialog departament={departament}>
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <Edit2Icon />
                        Editar
                    </DropdownMenuItem>
                </EditDepartamentDialog>

                <DeleteDepartamentDialog departament={departament}>
                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                        <Trash2Icon />
                        Excluir
                    </DropdownMenuItem>
                </DeleteDepartamentDialog>

                {departament.is_default ? null : (
                    <DropdownMenuItem onSelect={handleSetDefault}>
                        <FlagIcon />
                        Marcar como padrão
                    </DropdownMenuItem>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}