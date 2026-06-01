import Link from "next/link";
import MovimentationStatusBadge from "@/components/custom/badges/MovimentationStatusBadge";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import GoToCalendarButton from "@/components//custom/buttons/GoToCalendarButton";
import { MovimentationPopulated } from "@/types/database.type";

type MovimentationHeaderMainInfoProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationHeaderMainInfo({
  movimentation,
}: MovimentationHeaderMainInfoProps) {
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>Movimentação</PageTitle>
        <div className="flex  justify-end items-end gap-1">
          <BackButton to="/movimentations" label="Voltar à página de Movimentações" />
          <GoToCalendarButton to="/calendar/weekly" label="Ver calendário semanal" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <p>
          <strong>ID:</strong> #{movimentation.id}
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>OP:</strong> {movimentation.product.op}
        </p>
        <p className="flex gap-1">
          <strong>Produto:</strong>{" "}
          <Link
            className="flex gap-1 justify-center items-center hover:underline"
            href={`/products/${movimentation.product.id}`}
          >
            {movimentation.product.name}
          </Link>
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>Fluxo de Produção:</strong>
          <Link
            className="flex gap-1 justify-center items-center hover:underline"
            href="/production-flows"
          >
            {movimentation.productionFlow.name}
          </Link>
        </p>

        <p>
          <strong>Quantidade:</strong> {movimentation.amount}
        </p>

        {movimentation.status == "COMPLETED" && (
          <p>
            <strong>Concluída em:</strong> {new Date(movimentation.updated_at).toLocaleDateString()}
          </p>
        )}
        <p className="flex gap-1 items-start text-center">
          <strong>Status:</strong> <MovimentationStatusBadge movimentation={movimentation} />
        </p>
      </div>
    </div>
  );
}
