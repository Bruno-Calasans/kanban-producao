"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProcesses from "@/hooks/process/useGetAllProcesses";
import CreateProcessDialog from "@/components/process/dialogs/CreateProcessDialog";
import ProcessTable from "@/components/process/table/ProcessTable";

export default function ProcessesPage() {
  const { data, isLoading, error } = useGetAllProcesses();
  const processes = data?.data || [];

  if (isLoading) {
    return (
      <section>
        <PageTitle>Processos</PageTitle>
        <Loader title="Carregando processos..." />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <PageTitle>Processos</PageTitle>
        <p>Ocorreu um erro ao carregar os processos.</p>
      </section>
    );
  }

  return (
    <section>
      <PageTitle>Processos</PageTitle>
      <div className="flex flex-col">
        <CreateProcessDialog />
        <ProcessTable processes={processes} />
      </div>
    </section>
  );
}
