import { Status } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status == "PROCESSANDO")
    return (
      <Badge color="yellow" className="rounded-md">
        processando
      </Badge>
    );
  if (status == "PROCESSADO") return <Badge className="rounded-md bg-indigo-400">processado</Badge>;
  return <Badge className="rounded-md bg-emerald-400">pronto</Badge>;
}
