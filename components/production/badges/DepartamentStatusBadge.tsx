import { DepartamentState } from "@/types/database.type";
import { CircleAlertIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DESC } from "@/constants/desc";
import CustomTooltip from "@/components/custom/CustomTooltip";

type DepartamentStatusBadgeProps = {
  departamentState: DepartamentState;
};

export default function DepartamentStatusBadge({ departamentState }: DepartamentStatusBadgeProps) {
  const { status, flags } = departamentState;

  if (status == "PENDING")
    return (
      <CustomTooltip content={DESC.departament.pending} side="top">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <div className="relative w-fit cursor-default">
        <CustomTooltip
          content={
            flags?.hasPendingReprocess
              ? DESC.departament.inProgressWithReprocess
              : DESC.departament.inProgress
          }
          side="top"
        >
          <Badge className="bg-indigo-400 text-white">FAZENDO</Badge>
        </CustomTooltip>
        {flags?.hasPendingReprocess && (
          <CircleAlertIcon
            className="text-white fill-red-500 absolute -top-1.5 -right-2"
            size={18}
          />
        )}
      </div>
    );

  if (status == "ERROR")
    return (
      <CustomTooltip content="Departamento deu algo de errado" side="top">
        <Badge className="bg-red-400 text-white">ERROR</Badge>
      </CustomTooltip>
    );

  if (status == "SKIPPED")
    return (
      <CustomTooltip content={DESC.departament.skipped} side="top">
        <Badge className="bg-stone-400 text-white">PULADO</Badge>
      </CustomTooltip>
    );

  if (status == "REPROCESSING")
    return (
      <CustomTooltip content={DESC.departament.reprocess} side="top">
        <Badge className="bg-orange-600 text-white">REPROCESSO TOTAL</Badge>
      </CustomTooltip>
    );

  if (status == "EXTERNAL")
    return (
      <CustomTooltip content={DESC.departament.external} side="top">
        <Badge className="bg-purple-600 text-white">EXTERNO</Badge>
      </CustomTooltip>
    );

  return (
    <div className="relative w-fit cursor-default">
      <CustomTooltip
        content={
          flags?.hasReprocess ? DESC.departament.completedWithReprocess : DESC.departament.completed
        }
        side="top"
      >
        <Badge className="bg-emerald-400 text-white">FEITO</Badge>
      </CustomTooltip>
      {flags?.hasReprocess && (
        <CircleAlertIcon className="text-white fill-red-500 absolute -top-1.5 -right-2" size={18} />
      )}
    </div>
  );
}
