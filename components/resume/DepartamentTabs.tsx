"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { useState } from "react";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import CountBadge from "@/components/custom/badges/CountBadge";
import DepartamentProductionTable from "./DepartamentProductionTable";
import groupDeadlineDataByProductionAndDepartament from "@/utils/groupDeadlineDataByProductionAndDepartament";
import groupDepartamentStatesByProductionAndDepartament from "@/utils/groupDepartamentStatesByProductionAndDepartament";

type ProductionTabsProps = {
  departaments: Departament[];
  productionsByDepartament: Map<number, ProductionPopulated[]>;
  deadlineStatusByDeadline: Map<number, DeadlineStatusData>;
  deadlinesByDepartament: Map<number, ProductionDeadlinePopulated[]>;
  departamentStatesByProduction: Map<number, DepartamentState[]>;
};

export default function DepartamentTabs({
  departaments,
  productionsByDepartament,
  deadlineStatusByDeadline,
  deadlinesByDepartament,
  departamentStatesByProduction,
}: ProductionTabsProps) {
  const [selectedTab, setSelectedTab] = useState(String(departaments[0].id));

  const selectedDepartamentId = Number(selectedTab);
  const departament = departaments.find((dpt) => dpt.id == selectedDepartamentId)!;
  const deadlines = deadlinesByDepartament.get(selectedDepartamentId) || [];
  const productions =
    productionsByDepartament.get(selectedDepartamentId) || deadlines.map((d) => d.production);

  // Tem os status e deadline do departamento selecionado por produção
  const deadlineDataByProduction = groupDeadlineDataByProductionAndDepartament({
    departamentProductions: productions,
    departamentDeadlines: deadlines,
    deadlineStatusByDeadline,
  });

  const departamentStateDataByProduction = groupDepartamentStatesByProductionAndDepartament({
    departament,
    departamentProductions: productions,
    departamentStatesByProduction,
  });

  console.log(deadlines);

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="flex justify-between">
        <TabsList className="w-full">
          {departaments.map((dpt) => (
            <TabsTrigger className="m-2" value={String(dpt.id)} key={dpt.id}>
              {dpt.name.toUpperCase()}
              <CountBadge amount={deadlinesByDepartament.get(dpt.id)?.length || 0} />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value={selectedTab}>
        <DepartamentProductionTable
          departament={departament}
          productions={productions}
          deadlineDataByProduction={deadlineDataByProduction}
          departamentStateDataByProduction={departamentStateDataByProduction}
        />
      </TabsContent>
    </Tabs>
  );
}
