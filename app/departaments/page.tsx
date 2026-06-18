"use client";

import { DepartamentTable } from "@/components/departament/table/DepartamentTable";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import PageTitle from "@/components/custom/PageTitle";
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments";
import CreateDepartamentDialog from "@/components/departament/dialogs/CreateDepartamentDialog";

export default function DepartamentsPage() {
  const { data, isPending, error } = useGetAllDepartaments();
  const departaments = data?.data || [];

  if (isPending) {
    return <Loader title="Carregando departamentos..." />;
  }

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar departamentos"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar os departamentos</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

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
