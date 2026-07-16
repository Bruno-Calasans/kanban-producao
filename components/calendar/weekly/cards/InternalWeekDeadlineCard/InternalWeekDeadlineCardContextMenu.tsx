import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
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
  dailyGoalDate: Date;
  deadline: ProductionDeadlinePopulated;
  deadlineState: DepartamentDeadlineState;
  dailyGoal?: DailyGoalPopulated;
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
  deadline,
  dailyGoal,
  dailyGoalDate,
  deadlineState,
  hideFinishDeadlineAction,
  hideEditDeadlineAction,
  hideFinishDailyGoalAction,
  hideDeleteDeadlineAction,
  hideRedoDailygoalAction,
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
              deadlineState={deadlineState}
              departamentStates={departamentStates}
              expectedGoalAmount={goalAmount}
              dailyGoalDate={dailyGoalDate}
              departament={departament}
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
              deadlineState={deadlineState}
              departamentStates={departamentStates}
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
