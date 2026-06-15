import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import FinishMetaDialog from "../../dialogs/FinishMetaDialog";
import FinishDeadlineDialog from "../../dialogs/FinishDeadlineDialog";
import EditDeadlineDialog from "../../dialogs/EditDeadlineDialog";

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
  departamentAvaliableAmount,
  hidden,
}: InternalWeekDeadlineCardContextMenurops) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent hidden={hidden}>
        {/* Concluir meta */}
        {!hideFinishMetaAction && (
          <ContextMenuItem asChild>
            <FinishMetaDialog
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

        {/* Concluir deadline */}
        {!hideFinishDeadlineAction && (
          <ContextMenuItem asChild>
            <FinishDeadlineDialog deadline={deadline} departamentStates={departamentStates} />
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
