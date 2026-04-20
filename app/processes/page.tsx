"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProcesses from "@/hooks/process/useGetAllProcesses";
import CreateProcessDialog from "@/components/process/dialogs/CreateProcessDialog";
import ProcessTable from "@/components/process/table/ProcessTable";
import PageMsg from "@/components/custom/msgs/PageMsg";

export default function ProcessesPage() {
  const { data, isLoading, error } = useGetAllProcesses();
  const processes = data?.data || [];

  if (isLoading) {
    return <Loader title="Carregando processos..." />;
  }

  if (error) {
    return (
      <PageMsg
        title="Erro"
        content="Algo deu errado ao carregar os processos"
        backBtnLabel="Voltar à página inicial"
        backBtnUrl="/"
      />
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
