import { MovimentationPopulated } from "@/types/database.type";
import Loader from "../custom/Loader";
import useGetAllMovimentationDeadlinesByMovimentation from "@/hooks/production-deadline/useGetAllDeadlinesByProduction";
import {
  InfoIcon,
  ClockCheckIcon,
  ClipboardClockIcon,
  ClockAlert,
  TriangleAlertIcon,
} from "lucide-react";
import CustomTooltip from "../custom/CustomTooltip";

type MovimentationDepartamentDetailsProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationDepartamentDetails({
  movimentation,
}: MovimentationDepartamentDetailsProps) {
  const { data, isPending, error } = useGetAllMovimentationDeadlinesByMovimentation(
    movimentation.id,
  );
  const deadlines = data?.data || [];

  if (isPending) return <Loader title="Carregando..." />;
  if (error) return <div>Algo deu errado</div>;

  const expiredDeadlines = deadlines.filter(({ planned_end_at }) =>
    planned_end_at ? new Date(planned_end_at) < new Date() : false,
  );

  const aboutToExpireDeadlines = deadlines.filter(({ planned_end_at }) => {
    if (!planned_end_at) return false;
    const expectedDate = new Date(planned_end_at);
    const now = new Date();
    const timeDiff = expectedDate.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 7 && daysDiff > 0;
  });

  if (deadlines.length == 0)
    return (
      <CustomTooltip side="left" content="Nenhum prazo definido.">
        <ClipboardClockIcon className="h-5 w-5" />
      </CustomTooltip>
    );

  if (expiredDeadlines.length == 0)
    return (
      <CustomTooltip side="left" content="Nenhum prazo expirado.">
        <ClockCheckIcon className="text-emerald-800 h-5 w-5" />
      </CustomTooltip>
    );

  if (aboutToExpireDeadlines.length > 0)
    return (
      <CustomTooltip side="left" content="Prazos perto de expirar">
        <TriangleAlertIcon className="text-amber-500 h-5 w-5" />
      </CustomTooltip>
    );

  return (
    <CustomTooltip side="left" content={`Você tem ${expiredDeadlines.length} prazos expirados.`}>
      <InfoIcon className="text-red-500 h-5 w-5" />
    </CustomTooltip>
  );
}
