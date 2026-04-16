"use client";

import { MovimentationPopulated } from "@/types/database.type";
import ProcessStateTable from "../table/ProcessStateTable";
import Loader from "@/components/custom/Loader";
import useProcessState from "@/hooks/process-state/useProcessState";

type MovimentationActionsTabProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationActionsTab({ movimentation }: MovimentationActionsTabProps) {
  const { processStates, isPending, isError } = useProcessState({ movimentation });

  if (isPending) return <Loader title="Carregando ações...." />;
  if (isError) return <div>Não foi possível carregar as ações</div>;
  return <ProcessStateTable processStates={processStates} />;
}
