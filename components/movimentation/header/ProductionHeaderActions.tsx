import {
  DepartamentState,
  MovimentationPopulated,
  ProductionDeadlinePopulated,
  ProductionFlowTemplatePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import ProductionHeaderMainInfo from "./ProductionHeaderMainInfo";
import ProductionHeaderActions from "./MovimentationHeaderActions";
import ProductionHeaderAlerts from "./ProductionHeaderAlerts";

type ProductionHeaderProps = {
  production: ProductionPopulated;
  deadlines: ProductionDeadlinePopulated[];
  flowTemplates: ProductionFlowTemplatePopulated[];
  departamentStates: DepartamentState[];
  departamentDeadlineStates: DepartamentDeadlineState[];
  movimentations: MovimentationPopulated[];
};

export default function MovimentationHeader({
  production,
  deadlines,
  flowTemplates,
  movimentations,
  departamentStates,
  departamentDeadlineStates,
}: ProductionHeaderProps) {
  return (
    <div>
      <ProductionHeaderMainInfo production={production} />
      <ProductionHeaderActions production={production} movimentations={movimentations} />
      <ProductionHeaderAlerts
        production={production}
        deadlines={deadlines}
        flowTemplates={flowTemplates}
        movimentations={movimentations}
        departamentStates={departamentStates}
        departamentDeadlineStates={departamentDeadlineStates}
      />
    </div>
  );
}
