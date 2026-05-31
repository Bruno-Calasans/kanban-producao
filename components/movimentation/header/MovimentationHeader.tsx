import {
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProcessState,
  ProductionFlowTemplateWithProcess,
} from "@/types/database.type";
import { DepartamentState } from "@/hooks/departament-state/useDepartamentState";
import MovimentationHeaderMainInfo from "./MovimentationHeaderMainInfo";
import MovimentationHeaderActions from "./MovimentationHeaderActions";
import MovimentationHeaderAlerts from "./MovimentationHeaderAlerts";

type MovimentationHeadergProps = {
  movimentation: MovimentationPopulated;
  departamentStates: DepartamentState[];
  deadlines: MovimentationDeadlinePopulated[];
  processExecutions: ProcessExecutionPopulated[];
  flowTemplates: ProductionFlowTemplateWithProcess[];
  processStates: ProcessState[];
};

export default function MovimentationHeader({
  movimentation,
  departamentStates,
  deadlines,
  processExecutions,
  flowTemplates,
}: MovimentationHeadergProps) {
  return (
    <div>
      <MovimentationHeaderMainInfo movimentation={movimentation} />
      <MovimentationHeaderActions movimentation={movimentation} />
      <MovimentationHeaderAlerts
        movimentation={movimentation}
        deadlines={deadlines}
        departamentStates={departamentStates}
        flowTemplates={flowTemplates}
        processExecutions={processExecutions}
      />
    </div>
  );
}
