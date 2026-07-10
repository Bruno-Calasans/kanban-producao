"use client";

import PageTitle from "@/components/custom/PageTitle";
import useGetAllActiveDepartaments from "@/hooks/departament/useGetAllActiveDepartaments";

export default function ResumePage() {
  const {} = useGetAllActiveDepartaments();

  return (
    <section>
      <PageTitle>Resumo</PageTitle>
      <p>Resume todas as produções por departamento.</p>
      {/* <ResumeTable productProductions={productProductions} /> */}
    </section>
  );
}
