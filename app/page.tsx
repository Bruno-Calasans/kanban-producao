"use client";

import PageTitle from "@/components/custom/PageTitle";
import type { ProductMovimentation } from "@/types/database.type";
import Loader from "@/components/custom/Loader";
import ResumeTable from "@/components/resume/ResumeTable";
import useGetAllMovimentations from "@/hooks/movimentation/useGetAllMovimentation";
import { useMemo } from "react";

export default function Home() {
  const { data, error, isPending } = useGetAllMovimentations();
  const movimentations = data?.data || [];

  const groupMovimentations = () => {
    if (isPending) return [];
    const groups: ProductMovimentation[] = [];
    movimentations.forEach((mov) => {
      const groupIndex = groups.findIndex((group) => group.product.id == mov.product.id);

      if (groupIndex != -1) {
        groups[groupIndex].movimentations.push(mov);
      } else {
        groups.push({
          product: mov.product,
          movimentations: [mov],
        });
      }
    });

    return groups;
  };

  const groups = useMemo(() => groupMovimentations(), [movimentations]);

  if (isPending) {
    return (
      <section>
        <PageTitle>Resumo</PageTitle>
        <Loader title="Carregando Resumo..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Resumo</PageTitle>
        <p>Ocorreu um erro ao carregar os produtos.</p>
      </section>
    );
  }

  return (
    <section>
      <PageTitle>Resumo</PageTitle>
      <p>Aqui está um resumo dos produtos cadastrados.</p>
      <ResumeTable productMovimentations={groups} />
    </section>
  );
}
