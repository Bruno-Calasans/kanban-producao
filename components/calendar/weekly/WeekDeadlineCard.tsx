import { Departament, MovimentationDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWeeklyDeadline } from "@/context/useWeeklyDeadline";
import WeekDeadlineCardContextMenu from "./WeekDeadlineCardContextMenu";
import Loader from "@/components/custom/Loader";
import { TargetIcon, ShirtIcon, HashIcon } from "lucide-react";
import useWeeklyDeadlineCard from "@/hooks/week-deadline-card/useWeeklyDeadlineCard";

export type WeekDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  departament: Departament;
  isExpected?: boolean;
  weekDays: Date[];
  weekDay: Date;
};

export default function WeekDeadlineCard({
  deadline,
  isExpected,
  departament,
  weekDay,
  weekDays,
}: WeekDeadlineCardProps) {
  const { movimentation } = deadline;
  const {
    processStates,
    metasInThisWeek,
    metaInThisDay,
    totalAmount,
    amountDoneInThisDay,
    daysAmount,
    departamentAvaliableAmount,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
    isPending,
    isError,
  } = useWeeklyDeadlineCard({ deadline, weekDay, weekDays });
  const { selectedDeadline, setSelectedDeadline } = useWeeklyDeadline();

  const isSameDeadline = selectedDeadline?.id == deadline.id;

  if (isPending) return <Loader title="Carregando..." />;

  if (isError) return <p>Erro ao carregar</p>;

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
          "flex flex-co h-fit rounded-none p-3 mt-2 transition-all",
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
        onMouseMove={() => setSelectedDeadline(deadline)}
        onMouseOut={() => setSelectedDeadline(null)}
      >
        <Link
          className={cn("[a]:hover:bg-secondary hover:border transiton-all")}
          href={`/movimentations/${movimentation.id}`}
        >
          <div className="flex flex-col items-start gap-1.5">
            <p className="font-bold mb-1 text-lg">{movimentation.product.name}</p>
            <p className="flex gap-0.5 items-center justify-center">
              <TargetIcon size={16} />
              <span className="font-bold">META DIÁRIA:</span> {metaAmount}
            </p>
            <p className="flex gap-0.5 items-center justify-center">
              <ShirtIcon size={16} />
              <span className="font-bold">FEITO:</span> {amountDoneInThisDay}
            </p>
            <p className="flex gap-0.5 items-center justify-center">
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
