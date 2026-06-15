import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ProductionDeadlinePopulated, DepartamentState } from "@/types/database.type";
import { ExternalDepartamentState } from "@/utils/calcDepartamentExternalState";
import ReturnDialog from "../../dialogs/ReturnDialog";

type ExternalWeekDeadlineCardContextMenuProps = {
  children: React.ReactNode;
  departamentStates: DepartamentState[];
  deadline: ProductionDeadlinePopulated;
  departamentAvaliableAmount: number;
  departamentExternalState: ExternalDepartamentState;
  hidden?: boolean;
};

export default function ExternalWeekDeadlineCardContextMenu({
  children,
  deadline,
  departamentStates,
  departamentExternalState,
  hidden,
}: ExternalWeekDeadlineCardContextMenuProps) {
  const avaliableDepartaments = departamentStates.map((state) => state.departament);

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
