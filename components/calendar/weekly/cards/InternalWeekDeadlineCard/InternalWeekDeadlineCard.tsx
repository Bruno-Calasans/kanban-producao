import {
  Departament,
  MetaPopulated,
  MovimentationDeadlinePopulated,
  ProcessState,
} from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import WeekDeadlineCardContextMenu from "./InternalWeekDeadlineCardContextMenu";
import { TargetIcon, ShirtIcon, HashIcon, FlagIcon, GoalIcon } from "lucide-react";
import useWeeklyDeadlineCard from "@/hooks/week-deadline-card/useWeeklyDeadlineCard";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import { checkDeadlineType } from "@/utils/checkDeadlineType";
import CustomTooltip from "@/components/custom/CustomTooltip";

export type InternalWeekDeadlineCardProps = {
  weekDay: Date;
  deadline: MovimentationDeadlinePopulated;
  departament: Departament;
  processStates: ProcessState[];
  metasInThisWeek: MetaPopulated[];
};

export default function InternalWeekDeadlineCard({
  deadline,
  departament,
  weekDay,
  processStates,
  metasInThisWeek,
}: InternalWeekDeadlineCardProps) {
  const setSelectedDeadlineId = useWeeklyDeadlineStore((state) => state.setSelectedDeadlineId);
  const isSameDeadline = useWeeklyDeadlineStore(
    (state) => state.selectedDeadlineId === deadline.id,
  );
  const isShort = useShortCardVersion((state) => state.isShort);

  const {
    totalAmount,
    amountDoneInThisDay,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
    isExpectedThisWeekDay,
    hasInternalWork,
    workState,
    avaliableAmount,
    metaInThisDay,
  } = useWeeklyDeadlineCard({ deadline, metasInThisWeek, processStates, weekDay });

  const movimentation = deadline.movimentation;
  const deadlineType = checkDeadlineType(deadline);

  return (
    <WeekDeadlineCardContextMenu
      departament={departament}
      processStates={processStates}
      metaAmount={metaAmount}
      metaWeekDate={weekDay}
      deadline={deadline}
      departamentAvaliableAmount={avaliableAmount}
      hidden={!avaliableAmount}
      hideFinishAction={hasInternalWork || isFinished}
      hideFinishMetaAction={
        isMetaDone || (isMetaIncomplete && amountDoneInThisDay > 0) || isFinished
      }
    >
      <Link
        className="[a]:hover:bg-secondary p-0 m-0 relative w-fit [a]:w-fit flex"
        href={`/movimentations/${movimentation.id}`}
      >
        <Badge
          asChild
          className={cn(
            "flex flex-co h-fit rounded-none p-3 mt-2",

            // Deadline interna sem atraso
            !isExpired &&
              !isFinished &&
              "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

            // Quando passa o mouse em cima de uma deadline interna sem atraso
            isSameDeadline && !isExpired && !isFinished && !isMetaIncomplete && "border-blue-700 ",

            // Deadline atrasada
            isExpired && !isFinished && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

            // Quando passa o mouse em cima de uma deadline atrasada
            isSameDeadline && isExpired && !isFinished && "border-red-700",

            // Deadline com meta incompleta
            !isExpired &&
              !isFinished &&
              isMetaIncomplete &&
              "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-30",

            // Quando passa o mouse em cima de uma deadline com meta incompleta
            isSameDeadline && !isExpired && !isFinished && isMetaIncomplete && "border-amber-700",

            // Quando meta ou deadline estiverem finalizadas
            (isFinished || isMetaDone) &&
              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",

            // Quando passa o mouse em cima de uma deadline finalizada ou meta concluída
            isSameDeadline && (isFinished || isMetaDone) && " border-emerald-700",
          )}
          onMouseEnter={() => setSelectedDeadlineId(deadline.id)}
          onMouseLeave={() => setSelectedDeadlineId(null)}
        >
          <div className="flex flex-col items-start gap-1.5">
            <p className="font-bold mb-1 text-md">
              {movimentation.product.name} | {movimentation.product.op}
            </p>

            {/* Departamento interno */}
            {workState == "READY" && isShort && (
              <p className="flex gap-0.5 items-center justify-center text-xs">
                <TargetIcon size={16} />
                <span className="font-bold">META DIÁRIA:</span> {metaAmount}/{totalAmount}
              </p>
            )}

            {workState == "WAITING_INPUT" && isShort && (
              <p className="flex gap-0.5 items-center justify-center text-xs">
                <span className="font-bold">AGUARDANDO</span>
              </p>
            )}

            {!isShort && (
              <>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <TargetIcon size={16} />
                  <span className="font-bold">META DIÁRIA:</span> {metaAmount}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <ShirtIcon size={16} />
                  <span className="font-bold">FEITO:</span> {amountDoneInThisDay}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <HashIcon size={16} />
                  <span className="font-bold">RESTANTE:</span>
                  {totalAmount}
                </p>
              </>
            )}
          </div>
        </Badge>

        {/* Começa e termina no mesmo dia */}
        {isExpectedThisWeekDay && deadlineType === "ONLY_EXPECTED" && (
          <div className="absolute top-0.5 -right-1 bg-black rounded-full flex p-0.5">
            <CustomTooltip content="Termina e começa neste dia" side="right">
              <GoalIcon size={14} className="text-white" />
            </CustomTooltip>
          </div>
        )}

        {isExpectedThisWeekDay && deadlineType === "RANGE" && (
          <div className="absolute top-0.5 -right-1 bg-black rounded-full flex p-0.5">
            <CustomTooltip content="Termina neste dia" side="right">
              <FlagIcon size={14} className="text-white" />
            </CustomTooltip>
          </div>
        )}
      </Link>
    </WeekDeadlineCardContextMenu>
  );
}
