"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DepartamentState,
  MovimentationPopulated,
  ProductionDeadlineLogPopulated,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { useState } from "react";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import ProductionDeadlineTable from "../table/ProductionDeadlineTable";
import DepartamentStateTable from "../table/DepartamentStateTable";
import MovimentationTable from "@/components/product/tables/MovimentationTable";
import ProductionDeadlineLogTable from "../table/ProductionDeadlineLogTable";
import CountBadge from "@/components/custom/badges/CountBadge";

type ProductionTabsProps = {
  movimentations: MovimentationPopulated[];
  deadlines: ProductionDeadlinePopulated[];
  departamentStates: DepartamentState[];
  deadlineLogs: ProductionDeadlineLogPopulated[];
  departamentDeadlineStates: DepartamentDeadlineState[];
};

const TABS = ["DEPARTAMENTS", "DEADLINES", "MOVIMENTATIONS", "DEADLINE-LOGS"];

export default function ProductionTabs({
  departamentDeadlineStates,
  departamentStates,
  movimentations,
  deadlines,
  deadlineLogs,
}: ProductionTabsProps) {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const internalDeadlines = deadlines.filter((deadline) => !deadline.departament.is_external);

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="flex justify-between">
        <TabsList className="w-full">
          <TabsTrigger className="m-2" value={TABS[0]}>
            Departamentos
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[1]}>
            Prazos <CountBadge amount={internalDeadlines.length} />
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[3]}>
            Replanejamentos <CountBadge amount={deadlineLogs.length} />
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[2]}>
            Movimentações <CountBadge amount={movimentations.length} />
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={TABS[0]}>
        <DepartamentStateTable departamentStates={departamentStates} deadlines={deadlines} />
      </TabsContent>

      <TabsContent value={TABS[1]}>
        <ProductionDeadlineTable departamentDeadlineStates={departamentDeadlineStates} hideSearch />
      </TabsContent>

      <TabsContent value={TABS[2]}>
        <MovimentationTable movimentations={movimentations} hideMovimentationColumn />
      </TabsContent>

      <TabsContent value={TABS[3]}>
        <ProductionDeadlineLogTable deadlineLogs={deadlineLogs} />
      </TabsContent>
    </Tabs>
  );
}
