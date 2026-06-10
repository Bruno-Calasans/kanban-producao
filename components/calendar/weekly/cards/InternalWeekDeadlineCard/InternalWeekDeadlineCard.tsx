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
import { TargetIcon, ShirtIcon, HashIcon, AsteriskIcon } from "lucide-react";
import useWeeklyDeadlineCard from "@/hooks/week-deadline-card/useWeeklyDeadlineCard";
import { useWeeklyDeadlineStore } from "@/store/weeklyDeadlineCardStore";
import { useShortCardVersion } from "@/hooks/local-storage/useShortCardVersion";
import DeadlineTypeBadge from "../../DeadlineTypeBadge";

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
    (state) => state.selectedDeadlineId === deadline.movimentation.id,
  );
  const isShort = useShortCardVersion((state) => state.isShort);
  const movimentation = deadline.movimentation;

  const {
    totalAmount,
    amountDoneInThisDay,
    metaAmount,
    isExpired,
    isFinished,
    isMetaDone,
    isMetaIncomplete,
    workState,
    avaliableAmount,
    isExpectedThisWeekDay,
    isStartedThisWeekDay,
    hasWork,
  } = useWeeklyDeadlineCard({ deadline, metasInThisWeek, processStates, weekDay });

  return (
    <WeekDeadlineCardContextMenu
      departament={departament}
      processStates={processStates}
      metaAmount={metaAmount}
      metaWeekDate={weekDay}
      deadline={deadline}
      departamentAvaliableAmount={avaliableAmount}
      hidden={!avaliableAmount || isMetaDone}
      hideEditDeadlineAction={isFinished || avaliableAmount == 0}
      hideFinishDeadlineAction={isFinished || avaliableAmount == 0}
      hideFinishMetaAction={
        isMetaDone || isFinished || (isMetaIncomplete && amountDoneInThisDay > 0)
      }
    >
      <Link
        className={cn("flex flex-col h-fit rounded-none mt-2 p-1", !hasWork && "cursor-default")}
        href={`/movimentations/${movimentation.id}`}
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
          onMouseEnter={() => setSelectedDeadlineId(deadline.movimentation.id)}
          onMouseLeave={() => setSelectedDeadlineId(null)}
        >
          <div className="flex flex-col items-start gap-1.5 relative">
            {/* Versão curta com entrada disponível no departamento */}
            {isShort && (
              <div className="mr-2">
                <p className="font-bold mb-1 text-md">{movimentation.product.op}</p>
                <p className="font-bold mb-1 text-md">Meta: {metaAmount}</p>
                {workState == "COMPLETED" && (
                  <p className="flex gap-0.5 items-center justify-center text-xs">
                    <span className="font-bold">
                      Concluído: {metaAmount}/{totalAmount}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Versão longa com entrada disponível no departamento */}
            {!isShort && workState != "WAITING_INPUT" && (
              <>
                <p className="font-bold mb-1 text-md">
                  {movimentation.product.name} | {movimentation.product.op}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <TargetIcon size={16} />
                  <span className="font-bold">META DIÁRIA:</span> {metaAmount}
                </p>
                <p className="flex gap-0.5 items-center justify-center text-xs">
                  <ShirtIcon size={16} />
                  <span className="font-bold">META FEITA:</span>{" "}
                  {isFinished ? metaAmount : amountDoneInThisDay}
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
                  {movimentation.product.name} | {movimentation.product.op}
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
