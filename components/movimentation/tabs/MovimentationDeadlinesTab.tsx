"use client";

import { MovimentationPopulated } from "@/types/database.type";
import Loader from "@/components/custom/Loader";
import useGetAllMovimentationDeadlinesByMovimentation from "@/hooks/movimentation-deadline/useGetAllMovimentationDeadlinesByMovimentation";
import MovimentationDeadlinesTable from "../table/MovimentationDeadlinesTable";

type MovimentationActionsTabProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationDeadlinesTab({ movimentation }: MovimentationActionsTabProps) {
  const { data, isPending, isError } = useGetAllMovimentationDeadlinesByMovimentation(
    movimentation.id,
  );
  const movimentationDeadlines = data?.data || [];

  if (isPending) return <Loader title="Carregando prazos...." />;
  if (isError) return <div>Não foi possível carregar os prazos</div>;

  return <MovimentationDeadlinesTable movimentationDeadlines={movimentationDeadlines} />;
}
