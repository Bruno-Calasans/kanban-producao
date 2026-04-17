import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductWithProductionFlow } from "@/types/database.type";
import ProductProcessExecutationsTab from "@/components/product/tabs/ProductProcessExecutationsTab";
import ProductMovimentationsTab from "@/components/product/tabs/ProductMovimentationsTab";

type ProductInfoTabsProps = {
  product: ProductWithProductionFlow;
};

type ProductInfoTabs = "movimentation" | "process-execution";

export default function ProductInfoTabs({ product }: ProductInfoTabsProps) {
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
        <ProductMovimentationsTab product={product} />
      </TabsContent>

      <TabsContent value="process-executation">
        <ProductProcessExecutationsTab product={product} />
      </TabsContent>
    </Tabs>
  );
}
