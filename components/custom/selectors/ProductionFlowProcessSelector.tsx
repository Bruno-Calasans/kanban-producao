"use client";

import { Process, ProductionFlowTemplate } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";

type ProductionFlowProcessSelectorProps = {
  flowTemplates: ProductionFlowTemplate[];
};

export default function productionFlowProcessSelector({
  flowTemplates,
}: ProductionFlowProcessSelectorProps) {
  const processes = data ? data.data : [];
  const selectedDefaultProcess = defaultProcess || selectedProcess || processes[0];

  return (
    <SingleSelector<Process>
      data={processes}
      selectedData={selectedProcess}
      defaultData={selectedDefaultProcess}
      labelSelector="name"
      isLoading={isPending}
      onChange={onValueChange}
      placeholder="Selecione o Processo"
      loadingMsg="Carregando os processos..."
      noItemFoundMsg={
        <div className="flex flex-col gap-1">
          <p>Nenhum processo encontrado.</p>
          <p>
            Cadastre um novo processo em{" "}
            <Link href="/processes">
              <Button size="sm" variant="link" className="p-0 font-bold">
                processos.
              </Button>
            </Link>
          </p>
        </div>
      }
    />
  );
}
