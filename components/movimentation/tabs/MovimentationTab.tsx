"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MovimentationDeadlinePopulated,
  MovimentationPopulated,
  ProcessExecutionPopulated,
  ProcessState,
} from "@/types/database.type";
import { useState } from "react";
import ProcessStateTable from "../table/ProcessStateTable";
import ProcessExecutationTable from "@/components/product/tables/ProcessExecutationTable";
import MovimentationDeadlinesTable from "../table/MovimentationDeadlinesTable";

type MovimentationTabsProps = {
  movimentation: MovimentationPopulated;
  processStates: ProcessState[];
  processExecutions: ProcessExecutionPopulated[];
  movimentationDeadlines: MovimentationDeadlinePopulated[];
};

const TABS = ["ACTIONS", "DEADLINE", "HISTORY"];

export default function MovimentationTabs({
  processStates,
  processExecutions,
  movimentationDeadlines,
}: MovimentationTabsProps) {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="flex justify-between">
        <TabsList className="w-full">
          <TabsTrigger className="m-2" value={TABS[0]}>
            Ações
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[1]}>
            Prazos
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[2]}>
            Histórico de Execuções
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={TABS[0]}>
        <ProcessStateTable processStates={processStates} />
      </TabsContent>

      <TabsContent value={TABS[1]}>
        <MovimentationDeadlinesTable
          movimentationDeadlines={movimentationDeadlines}
          processStates={processStates}
        />
        ;
      </TabsContent>

      <TabsContent value={TABS[2]}>
        <ProcessExecutationTable hideMovimentationColumn processExecutions={processExecutions} />;
      </TabsContent>
    </Tabs>
  );
}
