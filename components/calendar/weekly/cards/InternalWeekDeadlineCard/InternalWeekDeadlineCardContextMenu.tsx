import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import FinishDeadlineDialog from "../../dialogs/FinishDeadlineDialog";
import { Departament, MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import FinishMetaDialog from "../../dialogs/FinishMetaDialog";

type InternalWeekDeadlineCardContextMenurops = {
  children: React.ReactNode;
  processStates: ProcessState[];
  departament: Departament;
  metaAmount: number;
  metaWeekDate: Date;
  deadline: MovimentationDeadlinePopulated;
  departamentAvaliableAmount: number;
  hideFinishDeadlineAction?: boolean;
  hideFinishMetaAction?: boolean;
  hidden?: boolean;
};

export default function InternalWeekDeadlineCardContextMenu({
  children,
  processStates,
  departament,
  metaAmount,
  metaWeekDate,
  deadline,
  hideFinishDeadlineAction,
  hideFinishMetaAction,
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
            <FinishDeadlineDialog deadline={deadline} />
          </ContextMenuItem>
        )}

        {/* Concluir meta */}
        {!hideFinishMetaAction && (
          <ContextMenuItem asChild>
            <FinishMetaDialog
              processStates={processStates}
              metaAmount={metaAmount}
              departament={departament}
              metaWeekDate={metaWeekDate}
              deadline={deadline}
              departamentAvaliableAmount={departamentAvaliableAmount}
            />
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
