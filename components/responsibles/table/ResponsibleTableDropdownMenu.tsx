import { CheckIcon, Edit2Icon, EllipsisVerticalIcon, Trash2Icon, XIcon } from "lucide-react";
import { ResponsibleWithDepartament } from "@/types/database.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditResponsibleDialog from "../dialogs/EditResponsibleDialog";
import DeleteResponsibleDialog from "../dialogs/DeleteResponsibleDialog";
import useActiveResponsible from "@/hooks/responsible/useActiveResponsible";
import useGetAllExecutionsByResponsible from "@/hooks/process-executation/useGetAllExecutionsByResponsible";

type ResponsibleDropdownMenuProps = {
  responsible: ResponsibleWithDepartament;
};

export default function ResponsibleDropdownMenu({ responsible }: ResponsibleDropdownMenuProps) {
  const {
    toggleActive,
    error: activeError,
    isPending: isActivePending,
  } = useActiveResponsible({
    responsible,
  });

  const {
    data,
    error: executionsError,
    isPending: isExecutionsPending,
  } = useGetAllExecutionsByResponsible(responsible.id);

  const executions = data?.data || [];
  const isPending = isActivePending || isExecutionsPending;
  const isError = activeError || executionsError;

  const canEdit = !isPending && responsible.is_active;
  const canDelete = !isPending && executions.length == 0;
  const hideFields = !isPending && executions.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        {canEdit && (
          <EditResponsibleDialog responsible={responsible} hideDepartamentField={hideFields}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditResponsibleDialog>
        )}

        <DropdownMenuItem onSelect={toggleActive}>
          {responsible.is_active ? (
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
          <DeleteResponsibleDialog responsible={responsible}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteResponsibleDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
