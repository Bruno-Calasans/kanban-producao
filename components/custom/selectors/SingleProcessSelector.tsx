import { Departament, Process } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useGetAllProcessesByDepartament from "@/hooks/process/useGetAllProcessesByDepartament";

type SingleProcessSelectorProps = {
  departament: Departament;
  selectedProcess?: Process;
  defaultProcess?: Process;
  onValueChange(process?: Process): void;
};

export default function SingleProcessSelector({
  departament,
  selectedProcess,
  defaultProcess,
  onValueChange,
}: SingleProcessSelectorProps) {
  const { data, isPending } = useGetAllProcessesByDepartament(departament.id);
  const processes = data ? data.data : [];
  const selectedDefaultProcess = defaultProcess || selectedProcess || processes[0];

  return (
    <SingleSelector<Process>
      data={processes}
      selectedData={selectedProcess}
      defaultData={selectedDefaultProcess}
      labelSelector="name"
      isLoading={isPending}
      onChange={onValueChange}
      placeholder="Selecione o Processo"
      loadingMsg="Carregando os processos..."
      noItemFoundMsg={
        <div className="flex flex-col gap-1">
          <p>Nenhum processo encontrado.</p>
          <p>
            Cadastre um novo processo em{" "}
            <Link href="/processes">
              <Button size="sm" variant="link" className="p-0 font-bold">
                processos.
              </Button>
            </Link>
          </p>
        </div>
      }
    />
  );
}
