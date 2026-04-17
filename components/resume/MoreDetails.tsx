import useProcessState from "@/hooks/process-state/useProcessState";
import { MovimentationPopulated } from "@/types/database.type";
import Loader from "../custom/Loader";
import { Badge } from "@/components/ui/badge";

type MoreDetailsProps = {
  movimentation: MovimentationPopulated;
};

export default function MoreDetails({ movimentation }: MoreDetailsProps) {
  const { processStates, isError, isPending } = useProcessState({ movimentation });

  if (isPending) return <Loader title="Carregando..." />;
  if (isError) return <div>Algo deu errado</div>;

  const positiveProcesses = processStates.filter((p) => p.avaliableAmount > 0);

  return (
    <div className="flex flex-col gap-1">
      {positiveProcesses.map((p) => (
        <Badge key={p.process.id} className="text-xs">
          <p>
            <strong className="capitalize">{p.process.name} </strong>({p.avaliableAmount})
          </p>
        </Badge>
      ))}
    </div>
  );
}
