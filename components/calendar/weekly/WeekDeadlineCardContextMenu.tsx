import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import FinishDeadlineDialog from "./dialogs/FinishDeadlineDialog";
import { Departament, MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import FinishMetaDialog from "./dialogs/FinishMetaDialog";

type WeekDeadlineCardContextMenuProps = {
  children: React.ReactNode;
  processStates: ProcessState[];
  departament: Departament;
  metaAmount: number;
  metaWeekDate: Date;
  deadline: MovimentationDeadlinePopulated;
  departamentAvaliableAmount: number;
  hideFinishAction?: boolean;
  hideFinishMetaAction?: boolean;
};

export default function WeekDeadlineCardContextMenu({
  children,
  processStates,
  departament,
  metaAmount,
  metaWeekDate,
  deadline,
  hideFinishAction,
  hideFinishMetaAction,
  departamentAvaliableAmount,
}: WeekDeadlineCardContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {!hideFinishAction && (
          <ContextMenuItem asChild>
            <FinishDeadlineDialog deadline={deadline} />
          </ContextMenuItem>
        )}

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
