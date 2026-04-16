"use client";

import Loader from "@/components/custom/Loader";
import ProcessExecutationTable from "@/components/product/tables/ProcessExecutationTable";
import useGetAllProcessExecutionsByMovimentation from "@/hooks/process-executation/useGetAllProcessExecutionsByMovimentation";
import { MovimentationPopulated } from "@/types/database.type";

type MovimentationProcessExecutionsProps = {
  movimentation: MovimentationPopulated;
};

export function MovimentationProcessExecutions({
  movimentation,
}: MovimentationProcessExecutionsProps) {
  const { data, error, isPending } = useGetAllProcessExecutionsByMovimentation(movimentation.id);
  const processExecutions = data?.data || [];

  if (isPending) return <Loader title="Carregando execuções..." />;

  if (error) return <div>Erro ao carregar execuções</div>;

  return <ProcessExecutationTable processExecutions={processExecutions} />;
}
