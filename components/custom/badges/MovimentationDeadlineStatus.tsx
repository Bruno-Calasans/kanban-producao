import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";
import { DepartamenStatus } from "@/hooks/departament-state/useDepartamentState";

type MovimentationDeadlineStatusBadgeProps = {
  status: DepartamenStatus;
  expiredDays: number;
};

export default function MovimentationDeadlineStatusBadge({
  status,
  expiredDays,
}: MovimentationDeadlineStatusBadgeProps) {
  if (status == "EXPIRED")
    return (
      <CustomTooltip content="Departamento está em atraso">
        <Badge className="bg-red-400 text-white">ATRASADO ({expiredDays} dias atrás)</Badge>
      </CustomTooltip>
    );

  if (status == "PENDING")
    return (
      <CustomTooltip content="Departamento ainda não começou">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content="Departamento tem processo(s) em execução">
        <Badge className="bg-indigo-400 text-white">EM PROGRESSO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Departamento terminou">
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
