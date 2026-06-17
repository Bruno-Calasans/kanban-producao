import { Badge } from "@/components/ui/badge";

type DeadlineStatusBadgeProps = {
  isExpired?: boolean;
  isNotStart?: boolean;
  expiredDays: number;
};

export default function DeadlineStatusBadge({
  isExpired,
  isNotStart,
  expiredDays,
}: DeadlineStatusBadgeProps) {
  if (isNotStart) {
    <Badge variant="default" className="bg-indigo-500 rounded-full cursor-default">
      Não começou
    </Badge>;
  }

  if (isExpired) {
    return (
      <Badge variant="default" className="bg-red-500 rounded-full cursor-default">
        Expirado {expiredDays} dia(s) atrás
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="bg-green-500 rounded-full cursor-default">
      Dentro do prazo
    </Badge>
  );
}
