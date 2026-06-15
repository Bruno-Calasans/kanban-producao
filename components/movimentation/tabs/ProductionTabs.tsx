"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DepartamentState,
  MovimentationPopulated,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { useState } from "react";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import { Badge } from "@/components/ui/badge";
import ProductionDeadlineTable from "../table/ProductionDeadlineStatusBadge";
import DepartamentStateTable from "../table/DepartamentStateTable";
import MovimentationTable from "@/components/product/tables/MovimentationTable";

type ProductionTabsProps = {
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
  deadlines: ProductionDeadlinePopulated[];
  departamentStates: DepartamentState[];
  departamentDeadlineStates: DepartamentDeadlineState[];
};

const TABS = ["ACTIONS", "DEADLINE", "HISTORY"];

export default function ProductionTabs({
  departamentStates,
  departamentDeadlineStates,
  movimentations,
  deadlines,
  production,
}: ProductionTabsProps) {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const expiredDepartaments = departamentDeadlineStates.filter((dpt) => dpt.status === "EXPIRED");

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="flex justify-between">
        <TabsList className="w-full">
          <TabsTrigger className="m-2" value={TABS[0]}>
            Departamentos
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[1]}>
            Prazos{" "}
            <Badge className="flex justify-center items-center rounded-full w-2 h-4 text-xs bg-red-500">
              {expiredDepartaments.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[2]}>
            Histórico de Movimentações
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={TABS[0]}>
        <DepartamentStateTable departamentStates={departamentStates} />
      </TabsContent>

      <TabsContent value={TABS[1]}>
        <ProductionDeadlineTable departamentDeadlineStates={departamentDeadlineStates} hideSearch />
      </TabsContent>

      <TabsContent value={TABS[2]}>
        <MovimentationTable movimentations={movimentations} hideMovimentationColumn />
      </TabsContent>
    </Tabs>
  );
}
