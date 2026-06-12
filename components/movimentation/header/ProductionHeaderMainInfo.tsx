import Link from "next/link";
import MovimentationStatusBadge from "@/components/custom/badges/ProductionStatusBadge";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import GoToCalendarButton from "@/components//custom/buttons/GoToCalendarButton";
import { ProductionPopulated } from "@/types/database.type";

type ProductionHeaderMainInfoProps = {
  production: ProductionPopulated;
};

export default function ProductionHeaderMainInfo({ production }: ProductionHeaderMainInfoProps) {
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>Produção #{production.id}</PageTitle>
        <div className="flex  justify-end items-end gap-1">
          <BackButton to="/producions" label="Voltar à página de Produções" />
          <GoToCalendarButton to="/calendar/weekly" label="Ver calendário semanal" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <p className="flex gap-1 items-start text-center">
          <strong>OP:</strong> {production.op}
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>REF:</strong> {production.product.ref}
        </p>
        <p className="flex gap-1">
          <strong>Produto:</strong>{" "}
          <Link
            className="flex gap-1 justify-center items-center hover:underline"
            href={`/products/${production.product.id}`}
          >
            {production.product.name}
          </Link>
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>Fluxo de Produção:</strong>
          <Link
            className="flex gap-1 justify-center items-center hover:underline"
            href="/production-flows"
          >
            {production.productionFlow.name}
          </Link>
        </p>

        <p>
          <strong>Quantidade:</strong> {production.amount}
        </p>

        {production.status == "COMPLETED" && (
          <p>
            <strong>Concluída em:</strong> {new Date(production.updated_at).toLocaleDateString()}
          </p>
        )}
        <p className="flex gap-1 items-start text-center">
          <strong>Status:</strong> <MovimentationStatusBadge production={production} />
        </p>
      </div>
    </div>
  );
}
