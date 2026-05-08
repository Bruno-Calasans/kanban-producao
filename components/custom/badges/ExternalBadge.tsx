import { Badge } from "@/components/ui/badge";

type ExternalBadgeProps = {
  isExternal?: boolean;
};

export default function ExternalBadge({ isExternal }: ExternalBadgeProps) {
  return isExternal ? (
    <Badge variant="default" className="bg-emerald-500 rounded-full">
      Sim
    </Badge>
  ) : (
    <Badge variant="secondary" className="rounded-full">
      Não
    </Badge>
  );
}
