import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DailyGoalPopulated,
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import FinishGoalDialog from "../../dialogs/FinishGoalDialog";
import FinishDeadlineDialog from "../../dialogs/FinishDeadlineDialog";
import EditDeadlineDialog from "../../dialogs/ReplanDeadlineDialog";
import DeleteDeadlineDialogDialog from "../../dialogs/DeleteDeadlineDialog";
import RedoDailyGoalDialog from "../../dialogs/RedoDailyGoalDialog";

type InternalWeekDeadlineCardContextMenurops = {
  children: React.ReactNode;
  departamentStates: DepartamentState[];
  departament: Departament;
  goalAmount: number;
  metaWeekDate: Date;
  deadline: ProductionDeadlinePopulated;
  dailyGoal?: DailyGoalPopulated;
  departamentAvaliableAmount: number;
  hideFinishDeadlineAction?: boolean;
  hideFinishDailyGoalAction?: boolean;
  hideEditDeadlineAction?: boolean;
  hideDeleteDeadlineAction?: boolean;
  hideRedoDailygoalAction?: boolean;
  hidden?: boolean;
};

export default function InternalWeekDeadlineCardContextMenu({
  children,
  departamentStates,
  departament,
  goalAmount,
  metaWeekDate,
  deadline,
  dailyGoal,
  hideFinishDeadlineAction,
  hideEditDeadlineAction,
  hideFinishDailyGoalAction,
  hideDeleteDeadlineAction,
  hideRedoDailygoalAction,
  departamentAvaliableAmount,
  hidden,
}: InternalWeekDeadlineCardContextMenurops) {
  const departamentState = departamentStates.find(
    (state) => state.departament.id == departament.id,
  )!;

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-fit">{children}</ContextMenuTrigger>

      <ContextMenuContent hidden={hidden}>
        {/* Concluir meta */}
        {!hideFinishDailyGoalAction && (
          <ContextMenuItem asChild>
            <FinishGoalDialog
              departamentStates={departamentStates}
              expectedGoalAmount={goalAmount}
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
              departamentState={departamentState}
            />
          </ContextMenuItem>
        )}

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

        {!hideRedoDailygoalAction && dailyGoal && (
          <ContextMenuItem asChild>
            <RedoDailyGoalDialog deadline={deadline} dailyGoal={dailyGoal} />
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
