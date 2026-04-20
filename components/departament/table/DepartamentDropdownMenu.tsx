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
import useActiveDepartament from "@/hooks/departament/useActiveDepartament";
import useGetlAllFlowTemplatesByDepartament from "@/hooks/production-flow-template/useGetlAllFlowTemplatesByDepartament";

type DepartamentDropdownMenuProps = {
  departament: Departament;
};

export default function DepartamentDropdownMenu({ departament }: DepartamentDropdownMenuProps) {
  const {
    toggleActive,
    error: activeError,
    isPending: isActivePending,
  } = useActiveDepartament({
    departament,
  });
  const {
    data,
    error: templatesError,
    isPending: isTemplatesPending,
  } = useGetlAllFlowTemplatesByDepartament(departament.id);

  const templates = data?.data || [];
  const isPending = isActivePending || isTemplatesPending;
  const isError = activeError || templatesError;

  const canEdit = !isPending && departament.is_active;
  const canDelete = !isPending && templates.length == 0;
  const hideFields = !isPending && templates.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        {canEdit && (
          <EditDepartamentDialog departament={departament} hideSequenceField={hideFields}>
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
