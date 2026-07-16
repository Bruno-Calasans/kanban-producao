import { DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShirtIcon, HashIcon, BoxesIcon } from "lucide-react";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import Link from "next/link";
import ExternalWeekDeadlineCardContextMenu from "./ExternalWeekDeadlineCardContextMenu";
import DeadlineTypeBadge from "../../DeadlineTypeBadge";
import normalizeDate from "@/utils/normalizeDate";

export type ExternalWeekDeadlineCardProps = {
  weekDay: Date;
  deadline: ProductionDeadlinePopulated;
  deadlineState: DepartamentDeadlineState;
  departamentStates: DepartamentState[];
};

export default function ExternalWeekDeadlineCard({
  weekDay,
  deadline,
  deadlineState,
  departamentStates,
}: ExternalWeekDeadlineCardProps) {
  const setSelectedDeadlineId = useWeeklyDeadlineStore((state) => state.setSelectedDeadlineId);
  const isSameDeadline = useWeeklyDeadlineStore(
    (state) => state.selectedDeadlineId === deadline.id,
  );

  const isShort = useShortCardVersion((state) => state.isShort);

  const { production, planned_end_at } = deadline;
  const { departamentState, status } = deadlineState;
  const { returnAmount } = departamentState;
  const { amount } = production;

  const isCompleted = status == "EXPIRED" || status == "COMPLETED_EXPIRED";

  const isExpectedThisWeekDay =
    normalizeDate(planned_end_at)?.getTime() == normalizeDate(weekDay)?.getTime();

  return (
    <ExternalWeekDeadlineCardContextMenu
      hidden={isCompleted}
      deadline={deadline}
      departamentStates={departamentStates}
      departamentExternalState={departamentState}
    >
      <Link
        className="[a]:hover:bg-secondary p-0 m-0 relative w-fit [a]:w-fit flex"
        href={`/productions/${production.id}`}
      >
        <Badge
          asChild
          className={cn(
            "flex flex-co h-fit rounded-none p-3",

            // Deadline externa sem atraso
            status == "IN_PROGRESS" &&
              "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",

            // Quando passa o mouse em cima de uma deadline externa sem atraso
            isSameDeadline && status == "IN_PROGRESS" && "border-purple-700 ",

            status == "EXPIRED" && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

            // Quando passa o mouse em cima de uma deadline atrasada
            isSameDeadline && status == "EXPIRED" && "border-red-700",

            // Quando meta ou deadline estiverem finalizadas
            isCompleted &&
              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

            // Quando passa o mouse em cima de uma deadline finalizada ou meta concluída
            isSameDeadline && isCompleted && " border-emerald-700",
          )}
          onMouseEnter={() => setSelectedDeadlineId(deadline.id)}
          onMouseLeave={() => setSelectedDeadlineId(null)}
        >
          <div className="flex flex-col items-start gap-1.5">
            {/* Title */}
            <p className="font-bold mb-1 text-md">
              {production.product.name} | {production.op}
            </p>

            {/* Quantidade */}
            {isShort && (
              <p className="flex gap-0.5 items-center justify-center text-xs">
                <BoxesIcon size={16} />
                <span className="font-bold">QUANTIDADE:</span> {returnAmount}/{amount}
              </p>
            )}

            {/* Versão curta */}
            {!isShort && (
              <>
                {/* Quanto foi feito */}
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <ShirtIcon size={16} />
                  <span className="font-bold">RETORNADO:</span> {returnAmount}
                </p>
                {/* Quanto falta fazer */}
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <HashIcon size={16} />
                  <span className="font-bold">TOTAL:</span>
                  {amount}
                </p>
              </>
            )}
          </div>
        </Badge>
        <DeadlineTypeBadge deadline={deadline} isExpectedThisWeekDay={isExpectedThisWeekDay} />
      </Link>
    </ExternalWeekDeadlineCardContextMenu>
  );
}
