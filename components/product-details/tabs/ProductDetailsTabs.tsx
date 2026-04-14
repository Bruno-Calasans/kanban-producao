import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductWithProductionFlow } from "@/types/database.type";
import { useState } from "react";
import ProductProcessExecutationsTab from "./ProductProcessExecutationsTab";
import ProductMovimentationsTab from "./ProductMovimentationsTab";

type ProductDetailsTabsProps = {
  product: ProductWithProductionFlow;
};

type ProductDetailsTabs = "movimentation" | "process-execution";

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const [selectedTab, setSelectedTab] = useState<ProductDetailsTabs>("movimentation");

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => setSelectedTab(value as ProductDetailsTabs)}
      defaultValue="movimentation"
    >
      <div className="flex justify-between">
        <TabsList className="w-full">
          <TabsTrigger className="m-2" value="movimentation">
            Movimentações
          </TabsTrigger>

          <TabsTrigger className="m-2" value="process-executation">
            Execuções de Processos
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movimentation">
        <ProductMovimentationsTab product={product} />
      </TabsContent>

      <TabsContent value="process-executation">
        <ProductProcessExecutationsTab product={product} />
      </TabsContent>
    </Tabs>
  );
}
