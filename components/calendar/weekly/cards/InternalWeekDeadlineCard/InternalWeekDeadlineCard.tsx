import {
  DailyGoalPopulated,
  Departament,
  DepartamentState,
  ProductionDeadlinePopulated,
} from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import Link from "next/link";
import DeadlineTypeBadge from "../../DeadlineTypeBadge";
import WeekDeadlineCardContextMenu from "./InternalWeekDeadlineCardContextMenu";
import useWeeklyDeadlineCard from "@/hooks/week-deadline-card/useWeeklyDeadlineCard";
import sortMovimentationByCreatedAt from "@/utils/sortMovimentationByCreatedAt";
import removeDuplicate from "@/utils/removeDuplicate";
import { ShortVersionInternalWeekDeadlineCard } from "./ShortVersionInternalWeekDeadlineCard";
import FullVersionInternalWeekDeadlineCard from "./FullVersionInternalWeekDeadlineCard";

export type InternalWeekDeadlineCardProps = {
  weekDay: Date;
  departament: Departament;
  deadline: ProductionDeadlinePopulated;
  departamentStates: DepartamentState[];
  weekDailyGoals: DailyGoalPopulated[];
  deadlineState: DepartamentDeadlineState;
};

export default function InternalWeekDeadlineCard({
  deadline,
  departament,
  weekDay,
  departamentStates,
  weekDailyGoals,
  deadlineState,
}: InternalWeekDeadlineCardProps) {
  const setSelectedDeadlineId = useWeeklyDeadlineStore((state) => state.setSelectedDeadlineId);
  const isShort = useShortCardVersion((state) => state.isShort);
  const isSameDeadline = useWeeklyDeadlineStore(
    (state) => state.selectedDeadlineId === deadline.production.id,
  );

  const {
    goalAmount,
    amountDoneInThisDay,
    isDailyGoalDone,
    isDailyGoalIncomplete,
    dailyGoal,
    isExpectedThisWeekDay,
    isStartedThisWeekDay,
  } = useWeeklyDeadlineCard({ deadline, weekDailyGoals, deadlineState, weekDay });

  const { production } = deadline;
  const { status } = deadlineState;
  const isCompleted = status == "COMPLETED" || status == "COMPLETED_EXPIRED";

  // Movimentações dessa produção, exceto a inicial
  const movimentations = removeDuplicate(
    departamentStates.flatMap((state) => state.movimentations).filter((mov) => mov.type != "INIT"),
  );

  const sortedMovimentationsByDate = dailyGoal ? sortMovimentationByCreatedAt(movimentations) : [];

  const lastMovimentation = sortedMovimentationsByDate.at(-1)!;

  const hideDeleteDeadlineAction = movimentations.length > 1;

  const hideEditDeadlineAction = isCompleted;

  const hideFinishDeadlineAction = isCompleted;

  const hideFinishDailyGoalAction =
    isDailyGoalDone || isCompleted || (isDailyGoalIncomplete && amountDoneInThisDay > 0);

  const hideRedoDailygoalAction =
    isCompleted || !dailyGoal || (dailyGoal && lastMovimentation?.goal_id != dailyGoal.id);

  return (
    <WeekDeadlineCardContextMenu
      departamentStates={departamentStates}
      departament={departament}
      goalAmount={goalAmount}
      dailyGoalDate={weekDay}
      deadline={deadline}
      dailyGoal={dailyGoal}
      hidden={isCompleted || status == "WAITING"}
      deadlineState={deadlineState}
      hideDeleteDeadlineAction={hideDeleteDeadlineAction}
      hideEditDeadlineAction={hideEditDeadlineAction}
      hideFinishDeadlineAction={hideFinishDeadlineAction}
      hideFinishDailyGoalAction={hideFinishDailyGoalAction}
      hideRedoDailygoalAction={hideRedoDailygoalAction}
    >
      <Link
        href={`/productions/${production.id}`}
        className={cn(
          "flex flex-col h-fit rounded-none mt-2 p-1 text-wrap",
          isCompleted && "cursor-default",
        )}
      >
        <Badge
          asChild
          className={cn(
            "flex flex-co h-fit rounded-none p-2 mt-2",

            // Versão curta
            isShort && "p-1",

            // Deadline interna sem atraso
            (status == "IN_PROGRESS" || status == "WAITING") &&
              "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

            // Quando passa o mouse em cima de uma deadline interna sem atraso
            isSameDeadline &&
              (status == "IN_PROGRESS" || status == "WAITING") &&
              !isDailyGoalIncomplete &&
              "border-blue-700 ",

            // Deadline atrasada
            status == "EXPIRED" && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

            // Quando passa o mouse em cima de uma deadline atrasada
            isSameDeadline && status == "EXPIRED" && "border-red-700",

            // Deadline com meta incompleta
            isDailyGoalIncomplete &&
              "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-30",

            // Quando passa o mouse em cima de uma deadline com meta incompleta
            isSameDeadline && isDailyGoalIncomplete && "border-amber-700",

            // Quando meta ou deadline estiverem finalizadas
            isCompleted &&
              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

            // Quando passa o mouse em cima de uma deadline finalizada ou meta concluída
            isSameDeadline && isCompleted && " border-emerald-700",
          )}
          onMouseEnter={() => {
            setSelectedDeadlineId(production.id);
            console.log(deadlineState);
          }}
          onMouseLeave={() => setSelectedDeadlineId(null)}
        >
          <div
            id="internal-deadline-card-container"
            className="flex flex-col items-start gap-1.5 relative"
          >
            {isShort ? (
              <ShortVersionInternalWeekDeadlineCard
                deadlineState={deadlineState}
                goalAmount={goalAmount}
              />
            ) : (
              <FullVersionInternalWeekDeadlineCard
                amountDoneInThisDay={amountDoneInThisDay}
                deadlineState={deadlineState}
                goalAmount={goalAmount}
              />
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
