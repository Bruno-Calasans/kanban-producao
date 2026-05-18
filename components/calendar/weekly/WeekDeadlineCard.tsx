import { Departament, MovimentationDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWeeklyDeadline } from "@/context/useWeeklyDeadline";
import { differenceInDays } from "date-fns";
import useProcessState from "@/hooks/process-state/useProcessState";
import WeekDeadlineCardContextMenu from "./WeekDeadlineCardContextMenu";
import useGetAllMetasInRange from "@/hooks/meta/useGetAllMetasInRange";
import { formatDate } from "@/utils/formatDate";
import Loader from "@/components/custom/Loader";
import { TargetIcon, ShirtIcon, HashIcon } from "lucide-react";

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
  const { movimentation, started_at, expected_at, finished_at } = deadline;
  const { selectedDeadline, setSelectedDeadline } = useWeeklyDeadline();
  const {
    processStates,
    isPending: isProcessStatesPending,
    isError: processStateError,
  } = useProcessState({ movimentation });

  const firstDayOfWeek = weekDays[0];
  const lastDayOfWeek = weekDays[weekDays.length - 1];
  const {
    data,
    isPending: isMetasPending,
    error: metaError,
  } = useGetAllMetasInRange(firstDayOfWeek, lastDayOfWeek, deadline.id);

  const metasInThisWeek = data?.data || [];

  const metaInThisDay = metasInThisWeek.find(
    (meta) => formatDate(new Date(meta.ref_date + "T00:00:00")) == formatDate(weekDay),
  );

  console.log(deadline.id, metaInThisDay)

  // Quando passar o mouse em cima de um card
  const isSameDeadline = selectedDeadline?.id == deadline.id;

  // Dias entre a data que começou e terminou
  const daysAmount = started_at && expected_at ? differenceInDays(expected_at, started_at) + 1 : 0;

  // Quantidade que deve ser feita
  const totalAmount = movimentation.amount;
  const amountDoneInThisDay = metaInThisDay ? metaInThisDay.amount_done : 0;

  // Quantidade restante no departamento para fazer
  const departamentAvaliableAmount = processStates
    .filter((state) => state.process.departament.id == deadline.departament.id)
    .map((state) => state.avaliableAmount)
    .reduce((prev, curr) => prev + curr, 0);

  // Meta diária
  const metaAmount =
    metaInThisDay && metaInThisDay.expected_amount
      ? metaInThisDay.expected_amount
      : Number.parseInt(String(departamentAvaliableAmount / (daysAmount - metasInThisWeek.length)));

  const expectedDate = expected_at ? new Date(expected_at) : undefined;
  const finishedDate = finished_at ? new Date(finished_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expectedDate?.setHours(0, 0, 0, 0);
  finishedDate?.setHours(0, 0, 0, 0);

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();
  const isFinished = !!finishedDate;
  const isMetaDone = amountDoneInThisDay >= metaAmount;
  const isMetaIncomplete =
    !isFinished &&
    !isExpired &&
    metaInThisDay &&
    metaInThisDay.amount_done < metaInThisDay.expected_amount;

  const isPending = isProcessStatesPending || isMetasPending;
  const isError = processStateError || metaError;

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
      hideFinishMetaAction={!isMetaIncomplete && isFinished}
    >
      <Badge
        asChild
        className={cn(
          "flex flex-co h-fit rounded-none p-3 mt-2",
          !isFinished && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
          isExpired && !isFinished && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
          isMetaIncomplete && "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-30",
          isSameDeadline && isMetaIncomplete && "border-amber-700",
          isSameDeadline && isExpired && "border-red-700",
          isSameDeadline && !isExpired && !isMetaIncomplete && "border-blue-700 ",
          isSameDeadline && (isFinished || isMetaDone) && " border-emerald-700",
          (isFinished || isMetaDone) &&
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
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
