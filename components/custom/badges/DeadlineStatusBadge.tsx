import { Badge } from "@/components/ui/badge";

type DeadlineStatusBadgeProps = {
  isExpired?: boolean;
  expiredDays: number;
};

export default function DeadlineStatusBadge({ isExpired, expiredDays }: DeadlineStatusBadgeProps) {
  return isExpired ? (
    <Badge variant="default" className="bg-red-500 rounded-full cursor-default">
      Expirado {expiredDays} dia(s) atrás
    </Badge>
  ) : (
    <Badge variant="default" className="bg-green-500 rounded-full cursor-default">
      Dentro do prazo
    </Badge>
  );
}
