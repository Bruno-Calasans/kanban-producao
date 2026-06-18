"use client";

import { useMemo } from "react";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import ResumeTable from "@/components/resume/ResumeTable";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";
import PageMsg from "@/components/custom/msgs/PageMsg";
import groupProductProductions from "@/utils/groupProductByProductions";

export default function Home() {
  const { data, error, isPending } = useGetAllProductions();
  const productions = data?.data || [];

  const productProductions = useMemo(() => groupProductProductions(productions), [productions]);

  if (isPending) {
    return <Loader title="Carregando Resumo..." />;
  }

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar produções dos produtos"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar as produções dos produtos</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

  return (
    <section>
      <PageTitle>Home</PageTitle>
      <p>Resume todos os produtos e suas últimas produções. </p>
      <ResumeTable productProductions={productProductions} />
    </section>
  );
}
