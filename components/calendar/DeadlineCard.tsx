import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MovimentationDeadlinePopulated, Product } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

type DeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated & {
    movimentation: {
      product: Product;
    };
  };
};

export default function DeadlineCard({ deadline }: DeadlineCardProps) {
  const isExpired = deadline.planned_end_at
    ? new Date(deadline.planned_end_at) < new Date()
    : false;
  const hasExpiredDate = !!deadline.planned_end_at;
  const expireInDays = deadline.planned_end_at
    ? Math.ceil(
        (new Date(deadline.planned_end_at).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  return (
    <Card className={cn("w-flex-1 p-3", isExpired && "border border-red-500")}>
      <CardHeader>
        <Link className="hover:underline" href={`/products/${deadline.movimentation.id}`}>
          <CardTitle className="text-md">{deadline.movimentation.product.name}</CardTitle>
        </Link>

        <Link className="hover:underline" href={`/movimentations/${deadline.movimentation.id}`}>
          <CardDescription>Movimentação #{deadline.movimentation.id}</CardDescription>
        </Link>
        <CardDescription>Quantidade: {deadline.movimentation.amount}</CardDescription>
        <CardAction className="text-sm">
          <span className="font-bold">Prazo</span>:{" "}
          {deadline.planned_end_at
            ? new Date(deadline.planned_end_at).toLocaleDateString() + ` (${expireInDays} dias)`
            : "N/A"}
        </CardAction>
      </CardHeader>

      <CardFooter className="flex flex-1 gap-2">
        {isExpired && expireInDays && (
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            EXPIRADO HÁ {Math.abs(expireInDays)} DIA(S)
          </Badge>
        )}
        {!hasExpiredDate && (
          <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            SEM PRAZO
          </Badge>
        )}
        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {deadline.departament.name}
        </Badge>
      </CardFooter>
    </Card>
  );
}
