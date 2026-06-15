import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovimentationPopulated, Product, ProductionPopulated } from "@/types/database.type";
import ProcessExecutationTable from "./tables/MovimentationTable";
import ProductProductionTable from "./tables/ProductProductionTable";

type ProductInfoTabsProps = {
  product: Product;
  productions: ProductionPopulated[];
  movimentations: MovimentationPopulated[];
};

type ProductInfoTabs = "movimentation" | "process-execution";

export default function ProductInfoTabs({
  product,
  productions,
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
            Produções
          </TabsTrigger>

          <TabsTrigger className="m-2" value="process-executation">
            Histórico de Movimentações
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movimentation">
        <ProductProductionTable productions={productions} />
      </TabsContent>
      {/* 
      <TabsContent value="process-executation">
        <ProcessExecutationTable hideMovimentationColumn processExecutions={executions} />
      </TabsContent> */}
    </Tabs>
  );
}
