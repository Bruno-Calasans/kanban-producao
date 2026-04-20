"use client";

import { CheckIcon, Edit2Icon, EllipsisVerticalIcon, Trash2Icon, XIcon } from "lucide-react";
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
import useActiveDepartament from "@/hooks/departament/useActiveDepartament";

type DepartamentDropdownMenuProps = {
  departament: Departament;
};

export default function DepartamentDropdownMenu({ departament }: DepartamentDropdownMenuProps) {
  const {
    toggleActive,
    error: activeDepartamentError,
    isPending: isActiveDepartamentPending,
  } = useActiveDepartament({
    departament,
  });
  const {
    data,
    error: departamentMovimentationsError,
    isPending: isDepartamentMovimentationsPending,
  } = useGetAllMovimentationsByDepartament(departament.id);

  const executions = data?.data || [];
  const isPending = isActiveDepartamentPending || isDepartamentMovimentationsPending;
  const isError = activeDepartamentError || departamentMovimentationsError;
  const canEdit = !isPending && !isError && executions.length == 0;
  const canDelete = !isPending && !isError && executions.length == 0;

  console.log(departament.name, executions);

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

        <DropdownMenuItem onSelect={toggleActive}>
          {departament.is_active ? (
            <>
              <XIcon />
              Desativar
            </>
          ) : (
            <>
              <CheckIcon />
              Ativar
            </>
          )}
        </DropdownMenuItem>

        {canDelete && (
          <DeleteDepartamentDialog departament={departament}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteDepartamentDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
