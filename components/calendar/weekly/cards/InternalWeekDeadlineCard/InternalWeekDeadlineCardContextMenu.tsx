import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import FinishGoalDialog from "../../dialogs/FinishGoalDialog";
import FinishDeadlineDialog from "../../dialogs/FinishDeadlineDialog";
import EditDeadlineDialog from "../../dialogs/EditDeadlineDialog";
import DeleteDeadlineDialogDialog from "../../dialogs/DeleteDeadlineDialog";

type InternalWeekDeadlineCardContextMenurops = {
  children: React.ReactNode;
  departamentStates: DepartamentState[];
  departament: Departament;
  goalAmount: number;
  metaWeekDate: Date;
  deadline: ProductionDeadlinePopulated;
  departamentAvaliableAmount: number;
  hideFinishDeadlineAction?: boolean;
  hideFinishMetaAction?: boolean;
  hideEditDeadlineAction?: boolean;
  hideDeleteDeadlineAction?: boolean;
  hidden?: boolean;
};

export default function InternalWeekDeadlineCardContextMenu({
  children,
  departamentStates,
  departament,
  goalAmount,
  metaWeekDate,
  deadline,
  hideFinishDeadlineAction,
  hideEditDeadlineAction,
  hideFinishMetaAction,
  hideDeleteDeadlineAction,
  departamentAvaliableAmount,
  hidden,
}: InternalWeekDeadlineCardContextMenurops) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent hidden={hidden}>
        {/* Concluir deadline */}
        {!hideFinishDeadlineAction && (
          <ContextMenuItem asChild>
            <FinishDeadlineDialog
              deadline={deadline}
              departamentStates={departamentStates}
              departamentAvaliableAmount={departamentAvaliableAmount}
            />
          </ContextMenuItem>
        )}
        {/* Concluir meta */}
        {!hideFinishMetaAction && (
          <ContextMenuItem asChild>
            <FinishGoalDialog
              departamentStates={departamentStates}
              goalAmount={goalAmount}
              departament={departament}
              metaWeekDate={metaWeekDate}
              deadline={deadline}
              departamentAvaliableAmount={departamentAvaliableAmount}
            />
          </ContextMenuItem>
        )}

        {/* Editar deadline */}
        {!hideEditDeadlineAction && (
          <ContextMenuItem asChild>
            <EditDeadlineDialog
              deadline={deadline}
              departament={departament}
              departamentAvaliableAmount={departamentAvaliableAmount}
            />
          </ContextMenuItem>
        )}

        {!hideDeleteDeadlineAction && (
          <ContextMenuItem asChild>
            <DeleteDeadlineDialogDialog deadline={deadline} />
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
