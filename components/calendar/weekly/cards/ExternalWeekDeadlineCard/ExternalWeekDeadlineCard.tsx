import { Departament, DepartamentState, ProductionDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShirtIcon, HashIcon, BoxesIcon } from "lucide-react";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import Link from "next/link";
import ExternalWeekDeadlineCardContextMenu from "./ExternalWeekDeadlineCardContextMenu";
import useExternalWeeklyDeadlineCard from "@/hooks/week-deadline-card/useExternalWeeklyDeadlineCard";
import DeadlineTypeBadge from "../../DeadlineTypeBadge";

export type ExternalWeekDeadlineCardProps = {
  weekDay: Date;
  departament: Departament;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
};

export default function ExternalWeekDeadlineCard({
  deadline,
  departament,
  weekDay,
  departamentStates,
}: ExternalWeekDeadlineCardProps) {
  const setSelectedDeadlineId = useWeeklyDeadlineStore((state) => state.setSelectedDeadlineId);
  const isSameDeadline = useWeeklyDeadlineStore(
    (state) => state.selectedDeadlineId === deadline.id,
  );
  const isShort = useShortCardVersion((state) => state.isShort);
  const production = deadline.production;

  const {
    isDone,
    isExpired,
    isFinished,
    amountDone,
    totalAmount,
    avaliableAmount,
    isExpectedThisWeekDay,
    departamentExternalState,
  } = useExternalWeeklyDeadlineCard({ deadline, departamentStates, weekDay });

  return (
    <ExternalWeekDeadlineCardContextMenu
      processStates={departamentStates}
      deadline={deadline}
      departamentAvaliableAmount={avaliableAmount}
      departamentExternalState={departamentExternalState}
      hidden={isDone}
    >
      <Link
        className="[a]:hover:bg-secondary p-0 m-0 relative w-fit [a]:w-fit flex"
        href={`/productions/${production.id}`}
      >
        <Badge
          asChild
          className={cn(
            "flex flex-co h-fit rounded-none p-3 mt-2",

            // Deadline externa sem atraso
            !isExpired &&
              !isFinished &&
              "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",

            // Quando passa o mouse em cima de uma deadline externa sem atraso
            isSameDeadline && !isExpired && !isFinished && "border-purple-700 ",

            isExpired && !isFinished && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

            // Quando passa o mouse em cima de uma deadline atrasada
            isSameDeadline && isExpired && !isFinished && "border-red-700",

            // Quando meta ou deadline estiverem finalizadas
            (isFinished || isDone) &&
              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

            // Quando passa o mouse em cima de uma deadline finalizada ou meta concluída
            isSameDeadline && (isFinished || isDone) && " border-emerald-700",
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
                <span className="font-bold">QUANTIDADE:</span> {amountDone}/{totalAmount}
              </p>
            )}

            {/* Versão curta */}
            {!isShort && (
              <>
                {/* Quanto foi feito */}
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <ShirtIcon size={16} />
                  <span className="font-bold">RETORNADO:</span> {amountDone}
                </p>
                {/* Quanto falta fazer */}
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <HashIcon size={16} />
                  <span className="font-bold">ENVIADO:</span>
                  {totalAmount}
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
