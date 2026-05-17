import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import FinishDeadlineDialog from "./dialogs/FinishDeadlineDialog";
import { Departament, MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import FinishMetaDialog from "./dialogs/FinishMetaDialog";
import { ClipboardClockIcon } from "lucide-react";

type WeekDeadlineCardContextMenuProps = {
  children: React.ReactNode;
  processStates: ProcessState[];
  departament: Departament;
  metaAmount: number;
  metaWeekDate: Date;
  deadline: MovimentationDeadlinePopulated;
  departamentAvaliableAmount: number;
  hideFinishAction?: boolean;
  hideFinishMetaAction?: boolean;
};

export default function WeekDeadlineCardContextMenu({
  children,
  processStates,
  departament,
  metaAmount,
  metaWeekDate,
  deadline,
  hideFinishAction,
  hideFinishMetaAction,
  departamentAvaliableAmount,
}: WeekDeadlineCardContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {!hideFinishAction && (
          <ContextMenuItem asChild>
            <FinishDeadlineDialog deadline={deadline} />
          </ContextMenuItem>
        )}

        {!hideFinishMetaAction && (
          <ContextMenuItem asChild>
            <FinishMetaDialog
              processStates={processStates}
              metaAmount={metaAmount}
              departament={departament}
              metaWeekDate={metaWeekDate}
              deadline={deadline}
              departamentAvaliableAmount={departamentAvaliableAmount}
            />
          </ContextMenuItem>
        )}

        <ContextMenuItem asChild>
          <p className="flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
            <ClipboardClockIcon size={16} />
            Alterar Meta (não disponível)
          </p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
