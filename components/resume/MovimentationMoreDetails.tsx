import { ProductionPopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import Loader from "../custom/Loader";
import useDepartamentState from "@/hooks/process-state/useDepartamentState";

type ProductionMoreDetailsProps = {
  production: ProductionPopulated;
};

export default function ProductionMoreDetails({ production }: ProductionMoreDetailsProps) {
  const { departamentStates, isError, isPending } = useDepartamentState({ production });

  if (isPending) return <Loader title="Carregando..." />;
  if (isError) return <div>Algo deu errado</div>;

  const positiveProcesses = departamentStates.filter((p) => p.avaliableAmount > 0);

  return (
    <div className="flex flex-col gap-1">
      {positiveProcesses.map((p) => (
        <Badge key={p.departament.id} className="text-xs">
          <p>
            <strong className="capitalize">{p.departament.name} </strong>({p.avaliableAmount})
          </p>
        </Badge>
      ))}
    </div>
  );
}
