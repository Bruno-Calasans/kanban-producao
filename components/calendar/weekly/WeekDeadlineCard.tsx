import {
  Departament,
  MetaPopulated,
  MovimentationDeadlinePopulated,
  ProcessState,
} from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import WeekDeadlineCardContextMenu from "./WeekDeadlineCardContextMenu";
import { TargetIcon, ShirtIcon, HashIcon } from "lucide-react";
import useWeeklyDeadlineCard from "@/hooks/week-deadline-card/useWeeklyDeadlineCard";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";

export type WeekDeadlineCardProps = {
  weekDay: Date;
  deadline: MovimentationDeadlinePopulated;
  departament: Departament;
  processStates: ProcessState[];
  metasInThisWeek: MetaPopulated[];
};

export default function WeekDeadlineCard({
  deadline,
  departament,
  weekDay,
  processStates,
  metasInThisWeek,
}: WeekDeadlineCardProps) {
  const setSelectedDeadlineId = useWeeklyDeadlineStore((state) => state.setSelectedDeadlineId);
  const isSameDeadline = useWeeklyDeadlineStore(
    (state) => state.selectedDeadlineId === deadline.id,
  );

  const {
    totalAmount,
    amountDoneInThisDay,
    departamentAvaliableAmount,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
  } = useWeeklyDeadlineCard({ deadline, metasInThisWeek, processStates, weekDay });

  const movimentation = deadline.movimentation;

  return (
    <WeekDeadlineCardContextMenu
      departament={departament}
      processStates={processStates}
      metaAmount={metaAmount}
      metaWeekDate={weekDay}
      deadline={deadline}
      departamentAvaliableAmount={departamentAvaliableAmount}
      hideFinishAction={departamentAvaliableAmount > 0 || isFinished}
      hideFinishMetaAction={
        isMetaDone || (isMetaIncomplete && amountDoneInThisDay > 0) || isFinished
      }
    >
      <Badge
        asChild
        className={cn(
          "flex flex-co h-fit rounded-none p-3 mt-2",
          !isExpired &&
            !isFinished &&
            "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
          isSameDeadline && !isExpired && !isFinished && !isMetaIncomplete && "border-blue-700 ",
          isExpired && !isFinished && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
          isSameDeadline && isExpired && !isFinished && "border-red-700",
          !isExpired &&
            !isFinished &&
            isMetaIncomplete &&
            "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-30",
          isSameDeadline && !isExpired && !isFinished && isMetaIncomplete && "border-amber-700",
          (isFinished || isMetaDone) &&
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
          isSameDeadline && (isFinished || isMetaDone) && " border-emerald-700",
        )}
        onMouseEnter={() => setSelectedDeadlineId(deadline.id)}
        onMouseLeave={() => setSelectedDeadlineId(null)}
      >
        <Link
          className={cn("[a]:hover:bg-secondary hover:border")}
          href={`/movimentations/${movimentation.id}`}
        >
          <div className="flex flex-col items-start gap-1.5">
            <p className="font-bold mb-1 text-md">{movimentation.product.name}</p>
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
              {departamentAvaliableAmount} DE {totalAmount}
            </p>
          </div>
        </Link>
      </Badge>
    </WeekDeadlineCardContextMenu>
  );
}
