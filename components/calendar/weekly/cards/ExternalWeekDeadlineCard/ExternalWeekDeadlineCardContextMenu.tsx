import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ProductionDeadlinePopulated, DepartamentState } from "@/types/database.type";
import ReturnDialog from "../../dialogs/ReturnDialog";

type ExternalWeekDeadlineCardContextMenuProps = {
  children: React.ReactNode;
  departamentStates: DepartamentState[];
  deadline: ProductionDeadlinePopulated;
  departamentExternalState?: DepartamentState;
  hidden?: boolean;
};

export default function ExternalWeekDeadlineCardContextMenu({
  children,
  deadline,
  departamentStates,
  departamentExternalState,
  hidden,
}: ExternalWeekDeadlineCardContextMenuProps) {
  const internalDepartaments = departamentStates
    .map((state) => state.departament)
    .filter((departament) => departament && !departament.is_external);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent hidden={hidden}>
        {/* Dialog para retornar do departamento externo */}
        <ContextMenuItem asChild>
          {departamentExternalState && (
            <ReturnDialog
              externalDepartamentState={departamentExternalState}
              avaliableDepartaments={internalDepartaments}
              deadline={deadline}
            />
          )}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
