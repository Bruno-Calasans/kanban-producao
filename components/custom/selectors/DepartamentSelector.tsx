import { Departament } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useGetAllActiveDepartaments from "@/hooks/departament/useGetAllActiveDepartaments";

type DepartamentSelectorProps = {
  selectedDepartament?: Departament;
  defaultDepartament?: Departament;
  onValueChange(departament?: Departament): void;
};

export default function DepartamentSelector({
  selectedDepartament,
  defaultDepartament,
  onValueChange,
}: DepartamentSelectorProps) {
  const { data, isPending } = useGetAllActiveDepartaments();
  const departaments = data ? data.data : [];
  const defaultdepartament = defaultDepartament || selectedDepartament || departaments[0];

  return (
    <SingleSelector<Departament>
      data={departaments}
      selectedData={selectedDepartament}
      defaultData={defaultdepartament}
      labelSelector="name"
      isLoading={isPending}
      onChange={onValueChange}
      placeholder="Selecione o Departamento"
      loadingMsg="Carregando os departamentos..."
      noItemFoundMsg={
        <div className="flex flex-col gap-1">
          <p>Nenhum departamento encontrado.</p>
          <p>
            Cadastre um novo departamento em{" "}
            <Link href="/departaments">
              <Button size="sm" variant="link" className="p-0 font-bold">
                departamentos.
              </Button>
            </Link>
          </p>
        </div>
      }
    />
  );
}
