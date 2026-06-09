import { Badge } from "@/components/ui/badge";
import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { differenceInDays } from "date-fns";

type DeadlineStatusBadgeProps = {
  isExpired?: boolean;
  expiredDays: number;
};

export default function DeadlineStatusBadge({ isExpired, expiredDays }: DeadlineStatusBadgeProps) {
  return isExpired ? (
    <Badge variant="default" className="bg-red-500 rounded-full">
      Expirado {expiredDays} dia(s) atrás
    </Badge>
  ) : (
    <Badge variant="default" className="bg-green-500 rounded-full">
      Dentro do prazo
    </Badge>
  );
}
