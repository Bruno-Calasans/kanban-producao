import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import Link from "next/link";
import ProductionDeadlineStatusBadge from "../custom/badges/ProductionDeadlineStatusBadge";

type DeadlineCardProps = {
  deadline: ProductionDeadlinePopulated;
  deadlineStatus: DeadlineStatusData;
};

export default function DeadlineCard({ deadline, deadlineStatus }: DeadlineCardProps) {
  const { status, expireDays, expireDaysAfterEnd } = deadlineStatus;
  const { planned_end_at } = deadline;
  const plannedEndDate = planned_end_at ? new Date(planned_end_at) : null;

  return (
    <Card
      className={cn(
        "w-flex-1 p- mt-3",
        status === "EXPIRED" && "border border-red-500",
        status == "COMPLETED" && "border border-green-500",
        status == "COMPLETED_EXPIRED" && "border border-green-500",
        status == "IN_PROGRESS" && "border border-blue-500",
        status == "WAITING" && "border border-amber-500",
        status == "NOT_DEFINED" && "border border-gray-500",
        status == "REOPEN" && "border border-orange-500",
      )}
    >
      <CardHeader>
        <Link className="hover:underline" href={`/products/${deadline.production.product.id}`}>
          <CardTitle className="text-md">{deadline.production.product.name}</CardTitle>
        </Link>

        <CardDescription className="flex flex-col gap-1">
          <Link className="hover:underline" href={`/productions/${deadline.production.id}`}>
            <span>OP: {deadline.production.op}</span>
          </Link>
          <span>Ref: {deadline.production.product.ref}</span>
          <span>Quantidade: {deadline.production.amount}</span>
        </CardDescription>

        <CardAction className="text-sm">
          <span className="font-bold">Prazo</span>:{" "}
          {plannedEndDate ? plannedEndDate?.toLocaleDateString() : "N/A"}
        </CardAction>
      </CardHeader>

      <CardFooter className="flex flex-1 gap-2">
        <ProductionDeadlineStatusBadge deadline={deadline} deadlineStatus={deadlineStatus} />
        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {deadline.departament.name}
        </Badge>
      </CardFooter>
    </Card>
  );
}
