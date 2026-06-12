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
import useGetAllMovimentationsByResponsible from "@/hooks/movimentation/useGetAllMovimentationsByResponsible";

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
    error: movimentationsError,
    isPending: isExecutionsPending,
  } = useGetAllMovimentationsByResponsible(responsible.id);

  const movimentations = data?.data || [];
  const isPending = isActivePending || isExecutionsPending;
  const isError = activeError || movimentationsError;

  const canEdit = !isPending && responsible.is_active;
  const canDelete = !isPending && movimentations.length == 0;
  const hideFields = !isPending && movimentations.length > 0;

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
