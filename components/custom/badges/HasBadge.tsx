import { Badge } from "@/components/ui/badge";

type HasBadgeProps = {
  has?: boolean | null;
};

export default function HasBadge({ has }: HasBadgeProps) {
  if (has == false)
    return (
      <Badge variant="default" className="bg-red-500 rounded-full">
        Não
      </Badge>
    );

  if (has == undefined || has == null)
    return (
      <Badge variant="secondary" className="rounded-full">
        Nenhum
      </Badge>
    );

  return (
    <Badge variant="default" className="bg-emerald-500 rounded-full">
      Sim
    </Badge>
  );
}
