import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWeeklyDeadline } from "@/context/useWeeklyDeadline";
import { differenceInDays } from "date-fns";

export type WeekDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  day: Date;
  isExpected?: boolean;
};

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useProcessState from "@/hooks/process-state/useProcessState";

export default function WeekDeadlineCard({ deadline, day, isExpected }: WeekDeadlineCardProps) {
  const { movimentation, started_at, expected_at } = deadline;
  const { selectedDeadline, setSelectedDeadline } = useWeeklyDeadline();
  const { processStates } = useProcessState({ movimentation });

  const isSameDeadline = selectedDeadline?.id == deadline.id;
  const daysAmount = started_at && expected_at ? differenceInDays(expected_at, started_at) + 1 : 0;
  const totalAmount = movimentation.amount;
  const totalRemainingAmount = processStates
    .filter((state) => state.process.departament.id == deadline.departament.id)
    .map((state) => state.avaliableAmount)
    .reduce((prev, curr) => prev + curr, 0);
  const totalAmountDone = totalAmount - totalRemainingAmount;
  const amountPerDay = Number.parseInt(String(totalAmount / daysAmount));

  const startedDate = started_at ? new Date(started_at) : undefined;
  const expectedDate = expected_at ? new Date(expected_at) : undefined;
  const today = new Date();
  expectedDate?.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Badge
          asChild
          className={cn(
            "flex flex-co h-fit rounded-none p-3 mt-2 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
            isExpected && "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
            isExpired && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
            isSameDeadline && isExpired && "border-amber-700",
            isSameDeadline && !isExpected && !isExpired && "border-blue-700 ",
            isSameDeadline && isExpected && "border-amber-700 ",
          )}
          onMouseMove={() => setSelectedDeadline(deadline)}
          onMouseOut={() => setSelectedDeadline(null)}
        >
          <Link
            className={cn("[a]:hover:bg-secondary hover:border transiton-all")}
            href={`/movimentations/${movimentation.id}`}
          >
            <div className="flex flex-col items-start">
              <p className="font-bold mb-1">{movimentation.product.name}</p>
              <p>OP: {movimentation.product.op || "N/A"}</p>
              <p>META: {amountPerDay}</p>
              <p>
                FEITO: {totalAmountDone} DE {totalAmount}
              </p>
              <p>RESTANTE: {totalRemainingAmount}</p>

              {/* <Badge
                className={cn(
                  "mt-1 p-0 font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
                  isExpected && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
                )}
                asChild
              >
                {isExpected ? <p>Terminar</p> : <p>Começar</p>}
              </Badge> */}
            </div>
          </Link>
        </Badge>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Marcar como concluído</ContextMenuItem>
        <ContextMenuItem>Marcar como feito</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
