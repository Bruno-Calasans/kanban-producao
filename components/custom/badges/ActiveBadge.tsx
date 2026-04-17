import { Badge } from "@/components/ui/badge";

type ActiveBadgeProps = {
  isActive?: boolean;
};

export default function ActiveBadge({ isActive }: ActiveBadgeProps) {
  return isActive ? (
    <Badge variant="default" className="bg-emerald-500 rounded-full">
      Ativo
    </Badge>
  ) : (
    <Badge variant="secondary" className="rounded-full">
      Inativo
    </Badge>
  );
}
