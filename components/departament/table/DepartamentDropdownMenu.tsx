"use client"


import { Edit2Icon, EllipsisVerticalIcon, FlagIcon, Trash2Icon } from "lucide-react"
import EditDepartamentDialog from "../dialogs/EditDepartamentDialog"
import { Departament } from "@/types/database.type"
import DeleteDepartamentDialog from "../dialogs/DeleteDepartamentDialog"
import useSetDefaultDepartament from "@/hooks/departament/useSetDefaultDepartament"
import { toast } from "sonner"
import errorHandler from "@/utils/errorHandler"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type DepartamentDropdownMenuProps = {
    departament: Departament
}


export default function DepartamentDropdownMenu({ departament }: DepartamentDropdownMenuProps) {
    const { mutateAsync, isPending } = useSetDefaultDepartament()

    const handleSetDefault = async () => {
        if (isPending) return
        try {
            await mutateAsync({ departamentId: departament.id })
            toast.success("Departamento padrão atualizado com sucesso.")

        } catch (error) {
            errorHandler(error, {
                default: "Error: não foi possível definir departamento padrão."
            })

        }
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent side="bottom" align="end" className="w-fit">

                {departament.is_default ? null : (
                    <DropdownMenuItem onSelect={handleSetDefault}>
                        <FlagIcon />
                        Marcar como padrão
                    </DropdownMenuItem>
                )}

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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}