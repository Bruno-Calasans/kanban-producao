"use client";

import useGetAllProcessExecutationsByMovimentation from "@/hooks/process-executation/useGetAllProcessExecutionsByMovimentation";
import { Movimentation } from "@/types/database.type";
import ProcessExecutationTable from "../product-details/tables/ProcessExecutationTable";
import Loader from "../custom/Loader";

type MovimentationProcessExecutionsProps = {
  movimentation: Movimentation;
};

export function MovimentationProcessExecutions({
  movimentation,
}: MovimentationProcessExecutionsProps) {
  const { data, error, isPending } = useGetAllProcessExecutationsByMovimentation(movimentation.id);
  const processExecutations = data?.data || [];

  if (isPending) return <Loader title="Carregando execuções de processos...." />;

  if (error) return <div>Erro ao carregar execuções</div>;

  return <ProcessExecutationTable processExecutations={processExecutations} />;
}
