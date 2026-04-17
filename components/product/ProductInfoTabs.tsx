import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProductWithProductionFlow,
} from "@/types/database.type";
import MovimentationTable from "../movimentations/table/MovimentationTable";
import ProcessExecutationTable from "./tables/ProcessExecutationTable";

type ProductInfoTabsProps = {
  product: ProductWithProductionFlow;
  movimentations: MovimentationPopulated[];
  executions: ProcessExecutionPopulated[];
};

type ProductInfoTabs = "movimentation" | "process-execution";

export default function ProductInfoTabs({
  product,
  executions,
  movimentations,
}: ProductInfoTabsProps) {
  const [selectedTab, setSelectedTab] = useState<ProductInfoTabs>("movimentation");

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => setSelectedTab(value as ProductInfoTabs)}
      defaultValue="movimentation"
    >
      <div className="flex justify-between">
        <TabsList className="w-full">
          <TabsTrigger className="m-2" value="movimentation">
            Movimentações
          </TabsTrigger>

          <TabsTrigger className="m-2" value="process-executation">
            Histórico de Execuções
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movimentation">
        <MovimentationTable hideProductColumn movimentations={movimentations} />
      </TabsContent>

      <TabsContent value="process-executation">
        <ProcessExecutationTable hideMovimentationColumn processExecutions={executions} />
      </TabsContent>
    </Tabs>
  );
}
