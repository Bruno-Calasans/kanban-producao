"use client";

import { useMemo } from "react";
import type { ProductProduction } from "@/types/database.type";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import ResumeTable from "@/components/resume/ResumeTable";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";

export default function Home() {
  const { data, error, isPending } = useGetAllProductions();
  const productions = data?.data || [];

  const groupProductProductions = () => {
    if (isPending) return [];

    const groups: ProductProduction[] = [];

    productions.forEach((mov) => {
      const groupIndex = groups.findIndex((group) => group.product.id == mov.product.id);

      if (groupIndex != -1) {
        groups[groupIndex].productions.push(mov);
      } else {
        groups.push({
          product: mov.product,
          productions: [mov],
        });
      }
    });

    return groups;
  };

  const productProductions = useMemo(() => groupProductProductions(), [productions]);

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
      <ResumeTable productProductions={productProductions} />
    </section>
  );
}
