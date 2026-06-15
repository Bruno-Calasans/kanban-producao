import {
  DailyGoalPopulated,
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TargetIcon, ShirtIcon, HashIcon, AsteriskIcon } from "lucide-react";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import Link from "next/link";
import DeadlineTypeBadge from "../../DeadlineTypeBadge";
import WeekDeadlineCardContextMenu from "./InternalWeekDeadlineCardContextMenu";
import useWeeklyDeadlineCard from "@/hooks/week-deadline-card/useWeeklyDeadlineCard";

export type InternalWeekDeadlineCardProps = {
  weekDay: Date;
  departament: Departament;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  weekDailyGoals: DailyGoalPopulated[];
};

export default function InternalWeekDeadlineCard({
  deadline,
  departament,
  weekDay,
  departamentStates,
  weekDailyGoals,
}: InternalWeekDeadlineCardProps) {
  const setSelectedDeadlineId = useWeeklyDeadlineStore((state) => state.setSelectedDeadlineId);
  const isSameDeadline = useWeeklyDeadlineStore(
    (state) => state.selectedDeadlineId === deadline.production.id,
  );
  const isShort = useShortCardVersion((state) => state.isShort);
  const production = deadline.production;

  const {
    totalAmount,
    amountDoneInThisDay,
    goalAmount,
    isExpired,
    isFinished,
    isDailyGoalDone,
    isDailyGoalIncomplete,
    workState,
    avaliableAmount,
    isExpectedThisWeekDay,
    isStartedThisWeekDay,
    hasWork,
  } = useWeeklyDeadlineCard({ deadline, weekDailyGoals, departamentStates, weekDay });

  return (
    <WeekDeadlineCardContextMenu
      departament={departament}
      departamentStates={departamentStates}
      goalAmount={goalAmount}
      metaWeekDate={weekDay}
      deadline={deadline}
      departamentAvaliableAmount={avaliableAmount}
      hidden={!avaliableAmount || isDailyGoalDone}
      hideEditDeadlineAction={isFinished || avaliableAmount == 0}
      hideFinishDeadlineAction={isFinished || avaliableAmount == 0}
      hideFinishMetaAction={
        isDailyGoalDone || isFinished || (isDailyGoalIncomplete && amountDoneInThisDay > 0)
      }
    >
      <Link
        className={cn("flex flex-col h-fit rounded-none mt-2 p-1", !hasWork && "cursor-default")}
        href={`/productions/${production.id}`}
      >
        <Badge
          asChild
          className={cn(
            "flex flex-co h-fit rounded-none p-2 mt-2",
            isShort && "p-1",

            // Deadline interna sem atraso
            !isExpired &&
              !isFinished &&
              "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

            // Quando passa o mouse em cima de uma deadline interna sem atraso
            isSameDeadline &&
              !isExpired &&
              !isFinished &&
              !isDailyGoalIncomplete &&
              "border-blue-700 ",

            // Deadline atrasada
            isExpired && !isFinished && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

            // Quando passa o mouse em cima de uma deadline atrasada
            isSameDeadline && isExpired && !isFinished && "border-red-700",

            // Deadline com meta incompleta
            !isExpired &&
              !isFinished &&
              isDailyGoalIncomplete &&
              "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-30",

            // Quando passa o mouse em cima de uma deadline com meta incompleta
            isSameDeadline &&
              !isExpired &&
              !isFinished &&
              isDailyGoalIncomplete &&
              "border-amber-700",

            // Quando meta ou deadline estiverem finalizadas
            (isFinished || isDailyGoalDone) &&
              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

            // Quando passa o mouse em cima de uma deadline finalizada ou meta concluída
            isSameDeadline && (isFinished || isDailyGoalDone) && " border-emerald-700",
          )}
          onMouseEnter={() => setSelectedDeadlineId(production.id)}
          onMouseLeave={() => setSelectedDeadlineId(null)}
        >
          <div className="flex flex-col items-start gap-1.5 relative">
            {/* Versão curta com entrada disponível no departamento */}
            {isShort && (
              <div className="mr-2">
                <p className="font-bold mb-1 text-md">{production.op}</p>
                <p className="font-bold mb-1 text-md">Meta: {goalAmount}</p>
                {workState == "COMPLETED" && (
                  <p className="flex gap-0.5 items-center justify-center text-xs">
                    <span className="font-bold">
                      Concluído: {goalAmount}/{totalAmount}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Versão longa com entrada disponível no departamento */}
            {!isShort && workState != "WAITING_INPUT" && (
              <>
                <p className="font-bold mb-1 text-md">
                  {production.product.name} | {production.op}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <TargetIcon size={16} />
                  <span className="font-bold">META DIÁRIA:</span> {goalAmount}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <ShirtIcon size={16} />
                  <span className="font-bold">META FEITA:</span>{" "}
                  {isFinished ? goalAmount : amountDoneInThisDay}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <AsteriskIcon size={16} />
                  <span className="font-bold">RESTANTE TOTAL:</span> {avaliableAmount}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <HashIcon size={16} />
                  <span className="font-bold">TOTAL:</span>
                  {totalAmount}
                </p>
              </>
            )}

            {/* Versão longa aguardando entrada no departamento */}
            {!isShort && workState == "WAITING_INPUT" && (
              <>
                <p className="font-bold mb-1 text-md">
                  {production.product.name} | {production.op}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <span className="font-bold">AGUARDANDO ENTRADA</span>
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <HashIcon size={16} />
                  <span className="font-bold">TOTAL:</span>
                  {totalAmount}
                </p>
              </>
            )}

            <DeadlineTypeBadge
              deadline={deadline}
              isExpectedThisWeekDay={isExpectedThisWeekDay}
              isStartedThisWeekDay={isStartedThisWeekDay}
              isShort={isShort}
            />
          </div>
        </Badge>
      </Link>
    </WeekDeadlineCardContextMenu>
  );
}
