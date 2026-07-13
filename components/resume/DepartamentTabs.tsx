"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Departament,
  ProductionDeadline,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { useState } from "react";
import CountBadge from "@/components/custom/badges/CountBadge";
import ProductionTable from "../productions/table/ProductionTable";
import DepartamentProductionTable from "./DepartamentProductionTable";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";

type ProductionTabsProps = {
  departaments: Departament[];
  productionsByDepartament: Map<number, ProductionPopulated[]>;
  deadlinesByProduction: Map<number, ProductionDeadlinePopulated[]>;
  deadlineStatusByDeadline: Map<number, DeadlineStatusData>;
};

export default function DepartamentTabs({
  departaments,
  productionsByDepartament,
  deadlinesByProduction,
  deadlineStatusByDeadline,
}: ProductionTabsProps) {
  const [selectedTab, setSelectedTab] = useState(String(departaments[0].id));

  const productions = productionsByDepartament.get(Number(selectedTab)) || [];
  const departament = departaments.find((dpt) => dpt.id == Number(selectedTab))!;
  const deadlines = deadlinesByProduction.get(departament.id)!;
  const deadline = deadlines.find((d) => d.departament.id == departament.id);
  const deadlineStatus = deadlineStatusByDeadline.get(deadline?.id);

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="flex justify-between">
        <TabsList className="w-full">
          {departaments.map((dpt) => (
            <TabsTrigger className="m-2" value={String(dpt.id)} key={dpt.id}>
              {dpt.name.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value={selectedTab}>
        <DepartamentProductionTable
          productions={productions}
          departament={departament}
          deadline={deadline}
        />
      </TabsContent>
    </Tabs>
  );
}
