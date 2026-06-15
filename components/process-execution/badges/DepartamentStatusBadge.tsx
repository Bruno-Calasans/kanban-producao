import { DepartamentState } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";
import { CircleAlertIcon, TriangleAlertIcon } from "lucide-react";

type DepartamentStatusBadgeProps = {
  departamentState: DepartamentState;
};

export default function DepartamentStatusBadge({ departamentState }: DepartamentStatusBadgeProps) {
  const { status, flags } = departamentState;

  if (status == "PENDING")
    return (
      <CustomTooltip content="Produção ainda não começou neste departamento" side="top">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <div className="relative w-fit cursor-default">
        <CustomTooltip
          content={
            flags?.hasPendingReprocess
              ? "Departamento em andamento com reprocesso"
              : "Departamento em andamento"
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
      <CustomTooltip content="Departamento foi pulado" side="top">
        <Badge className="bg-stone-400 text-white">PULADO</Badge>
      </CustomTooltip>
    );

  if (status == "REPROCESSING")
    return (
      <CustomTooltip content="Departamento aguardando retrabalho" side="top">
        <Badge className="bg-orange-600 text-white">REPROCESSO TOTAL</Badge>
      </CustomTooltip>
    );

  if (status == "EXTERNAL")
    return (
      <CustomTooltip content="Peças enviadas para fora deste departamento" side="top">
        <Badge className="bg-purple-600 text-white">EXTERNO</Badge>
      </CustomTooltip>
    );

  return (
    <div className="relative w-fit cursor-default">
      <CustomTooltip
        content={
          flags?.hasReprocess
            ? "Departamento finalizado com reprocesso"
            : "Departamento finalizado sem reprocesso"
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
