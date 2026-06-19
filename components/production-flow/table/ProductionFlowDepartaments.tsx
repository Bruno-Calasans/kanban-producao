import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAllProductionFlowTemplates from "@/hooks/production-flow-template/useGetAllProductionFlowTemplates";
import { cn } from "@/lib/utils";
import { ProductionFlow } from "@/types/database.type";
import { useState } from "react";

type ProductionFlowDepartamentsProps = {
  productionFlow: ProductionFlow;
};

export default function ProductionFlowDepartaments({
  productionFlow,
}: ProductionFlowDepartamentsProps) {
  const { data, isPending } = useGetAllProductionFlowTemplates(productionFlow.id);
  const templates = data?.data || [];

  const canShowExpandButton = templates.length > 3;
  const [expand, setExpand] = useState(false);

  if (isPending) return <Loader title="Carregando departamentos" />;

  return (
    <div>
      <div className={cn("flex flex-col gap-1 overflow-hidden max-h-20", expand && "max-h-fit")}>
        {templates.map((template) => (
          <Badge key={template.id}>{template.departament.name}</Badge>
        ))}
      </div>
      {canShowExpandButton && (
        <div className="mt-1">
          <Button className="mt-1" variant="outline" size="xs" onClick={() => setExpand(!expand)}>
            {expand ? "Recolher" : "Expandir"}
          </Button>
        </div>
      )}
    </div>
  );
}
