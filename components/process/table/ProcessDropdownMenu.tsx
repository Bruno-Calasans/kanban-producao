import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, Edit2Icon, EllipsisVerticalIcon, Trash2Icon, XIcon } from "lucide-react";
import DeleteProcessDialog from "../dialogs/DeleteProcessDialog";
import EditProcessDialog from "../dialogs/EditProcessDialog";
import { ProcessWithDepartament } from "@/types/database.type";
import useGetAllProcessExecutionsByProcess from "@/hooks/process-executation/useGetAllProcessExecutionsByProcess";
import useActiveProcess from "@/hooks/process/useActiveProcess";

type ProcessDropdownMenuProps = {
  process: ProcessWithDepartament;
};

export default function ProcessDropdownMenu({ process }: ProcessDropdownMenuProps) {
  const {
    toggleActive,
    error: activeError,
    isPending: isActivepending,
  } = useActiveProcess({ process });

  const {
    data,
    error: isExectuionsError,
    isPending: isExecutionsPending,
  } = useGetAllProcessExecutionsByProcess(process.id);

  const executions = data?.data || [];
  const isPending = isActivepending || isExecutionsPending;
  const isError = activeError || isExectuionsError;
  const canEdit = !isPending && process.is_active;
  const canDelete = !isPending && !isError && executions.length == 0;
  const hideFields = !isPending && executions.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end">
        {canEdit && (
          <EditProcessDialog
            process={process}
            hideDepartamentField={hideFields}
            hideSequenceField={hideFields}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </EditProcessDialog>
        )}

        <DropdownMenuItem onSelect={toggleActive}>
          {process.is_active ? (
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
          <DeleteProcessDialog process={process}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteProcessDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
