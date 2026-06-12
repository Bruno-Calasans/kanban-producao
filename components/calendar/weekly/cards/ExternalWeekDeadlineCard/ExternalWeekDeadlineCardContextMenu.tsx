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
  const avaliableDepartaments = processStates.map((state) => state.de);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent hidden={hidden}>
        <ContextMenuItem asChild>
          <ReturnDialog
            externalDepartamentState={departamentExternalState}
            avaliableDepartaments={avaliableDepartaments}
            deadline={deadline}
          />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
