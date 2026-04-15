import { Departament, Responsible } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";
import { Button } from "@/components/ui/button";
import { useGetAllResponsiblesByDepartament } from "@/hooks/responsible/useGetAllResponsiblesByDepartament";
import Link from "next/link";

type ResponsibleSelectorProps = {
  departament: Departament;
  selectedResponsible?: Responsible;
  defaultResponsible?: Responsible;
  onValueChange(responsible?: Responsible): void;
};

export default function ResponsibleSelector({
  departament,
  selectedResponsible,
  defaultResponsible,
  onValueChange,
}: ResponsibleSelectorProps) {
  const { data, isPending } = useGetAllResponsiblesByDepartament(departament.id);
  const responsibles = data ? data.data : [];
  const defaultresponsible =
    defaultResponsible || responsibles.length > 0 ? responsibles[0] : undefined;

  return (
    <SingleSelector<Responsible>
      data={responsibles}
      selectedData={selectedResponsible}
      defaultData={defaultresponsible}
      labelSelector="name"
      isLoading={isPending}
      onChange={onValueChange}
      placeholder="Selecione o responsável"
      loadingMsg="Carregando responsáveis.."
      noItemFoundMsg={
        <div className="flex flex-col gap-1">
          <p>
            Nenhum responsável encontrado no departamento <strong>{departament.name}</strong>.
          </p>
          <p>
            Cadastre um novo responsável em{" "}
            <Link href="/responsibles">
              <Button size="sm" variant="link" className="p-0 font-bold">
                responsáveis.
              </Button>
            </Link>
          </p>
        </div>
      }
    />
  );
}
