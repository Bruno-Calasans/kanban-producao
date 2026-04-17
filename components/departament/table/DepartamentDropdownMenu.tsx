"use client";

import { Edit2Icon, EllipsisVerticalIcon, FlagIcon, Trash2Icon } from "lucide-react";
import EditDepartamentDialog from "../dialogs/EditDepartamentDialog";
import { Departament } from "@/types/database.type";
import DeleteDepartamentDialog from "../dialogs/DeleteDepartamentDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetAllMovimentationsByDepartament from "@/hooks/process-executation/useGetAllMovimentationsByDepartament";

type DepartamentDropdownMenuProps = {
  departament: Departament;
};

export default function DepartamentDropdownMenu({ departament }: DepartamentDropdownMenuProps) {
  const { data, error, isPending } = useGetAllMovimentationsByDepartament(departament.id);
  const executions = data?.data || [];

  const canEdit = !isPending && executions.length == 0;

  console.log(executions)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        {canEdit && (
          <EditDepartamentDialog departament={departament}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditDepartamentDialog>
        )}

        <DeleteDepartamentDialog departament={departament}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash2Icon />
            Excluir
          </DropdownMenuItem>
        </DeleteDepartamentDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
