"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MovimentationPopulated } from "@/types/database.type";
import { useState } from "react";
import MovimentationActionsTab from "./MovimentationActionsTab";
import { MovimentationProcessExecutions } from "./MovimentationProcessExecutions";

type MovimentationTabsProps = {
  movimentation: MovimentationPopulated;
};

const TABS = ["ACTIONS", "HISTORY"];

export default function MovimentationTabs({ movimentation }: MovimentationTabsProps) {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="flex justify-between">
        <TabsList className="w-full">
          <TabsTrigger className="m-2" value={TABS[0]}>
            AÇÕES
          </TabsTrigger>

          <TabsTrigger className="m-2" value={TABS[1]}>
            HISTÓRICO DE EXECUÇÕES
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={TABS[0]}>
        <MovimentationActionsTab movimentation={movimentation} />
      </TabsContent>

      <TabsContent value={TABS[1]}>
        <MovimentationProcessExecutions movimentation={movimentation} />
      </TabsContent>
    </Tabs>
  );
}
