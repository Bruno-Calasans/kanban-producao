import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import ReturnDialog from "../../dialogs/ReturnDialog";
import { ExternalProcessState } from "@/utils/calcDepartamentExternalState";

type ExternalWeekDeadlineCardContextMenuProps = {
  children: React.ReactNode;
  processStates: ProcessState[];
  deadline: MovimentationDeadlinePopulated;
  departamentAvaliableAmount: number;
  departamentExternalState: ExternalProcessState;
  hidden?: boolean;
};

export default function ExternalWeekDeadlineCardContextMenu({
  children,
  deadline,
  processStates,
  departamentExternalState,
  hidden,
}: ExternalWeekDeadlineCardContextMenuProps) {
  const avaliableProcesses = processStates.map((state) => state.process);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent hidden={hidden}>
        <ContextMenuItem asChild>
          <ReturnDialog
            externalProcessState={departamentExternalState}
            avaliableProcesses={avaliableProcesses}
            deadline={deadline}
          />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
