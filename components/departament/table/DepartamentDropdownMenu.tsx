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

type DepartamentDropdownMenuProps = {
  departament: Departament;
};

export default function DepartamentDropdownMenu({ departament }: DepartamentDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-fit">
        <EditDepartamentDialog departament={departament}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit2Icon />
            Editar
          </DropdownMenuItem>
        </EditDepartamentDialog>

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
