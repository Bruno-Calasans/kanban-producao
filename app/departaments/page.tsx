"use client";

import PageTitle from "@/components/custom/PageTitle";
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments";
import { DepartamentTable } from "../../components/departament/table/DepartamentTable";
import CreateDepartamentDialog from "@/components/departament/dialogs/CreateDepartamentDialog";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";

export default function DepartamentsPage() {
  const { data, isPending, error } = useGetAllDepartaments();
  const departaments = data?.data || [];

  if (isPending) {
    return <Loader title="Carregando departamentos..." />;
  }

  if (error) {
    return (
      <PageMsg
        title="Erro"
        content="Algo deu errado ao carregar os departamentos"
        backBtnLabel="Voltar à página inicial"
        backBtnUrl="/"
      />
    );
  }

  return (
    <section>
      <PageTitle>Departamentos</PageTitle>
      <div className="flex flex-col">
        <CreateDepartamentDialog />
        <DepartamentTable departaments={departaments} />
      </div>
    </section>
  );
}
