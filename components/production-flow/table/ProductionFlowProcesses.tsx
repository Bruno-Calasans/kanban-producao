import Loader from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAllProductionFlowTemplates from "@/hooks/production-flow-template/useGetAllProductionFlowTemplates";
import { cn } from "@/lib/utils";
import { ProductionFlow } from "@/types/database.type";
import { useState } from "react";

type ProductionFlowProcessesProps = {
  productionFlow: ProductionFlow;
};

export default function ProductionFlowProcesses({ productionFlow }: ProductionFlowProcessesProps) {
  const { data, isPending } = useGetAllProductionFlowTemplates(productionFlow.id);
  const productionFlowTemplates = data?.data || [];
  const processes = productionFlowTemplates.flatMap((template) => template.process);
  const canShowExpandButton = processes.length > 3;
  const [expand, setExpand] = useState(false);

  if (isPending) return <Loader title="Carregando processos" />;

  return (
    <div>
      <div className={cn("flex flex-col gap-1 overflow-hidden max-h-20", expand && "max-h-fit")}>
        {processes.map((process) => (
          <Badge key={process.id}>
            {process.sequence} - {process.name}
          </Badge>
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
