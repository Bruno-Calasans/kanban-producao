import { ProductionPopulated } from "@/types/database.type";
import { Button } from "@/components/ui/button";
import { Calendar1Icon, CalendarDaysIcon, ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Link from "next/link";
import ProductionStatusBadge from "@/components/custom/badges/ProductionStatusBadge";
import PageTitle from "@/components/custom/PageTitle";

type ProductionHeaderMainInfoProps = {
  production: ProductionPopulated;
};

export default function ProductionHeaderMainInfo({ production }: ProductionHeaderMainInfoProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-between">
        <PageTitle>Produção #{production.id}</PageTitle>
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
            <strong>Status:</strong> <ProductionStatusBadge production={production} />
          </p>
        </div>
      </div>
      {/* Botões */}
      <div className="flex items-end gap-1 flex-col">
        <Link href={"/productions"}>
          <Button variant="link">
            <ChevronLeftIcon />
            Voltar para página de produções
          </Button>
        </Link>

        <Link href={"/resume"}>
          <Button variant="link">
            <ScrollTextIcon />
            Resumo das produções
          </Button>
        </Link>

        <Link href={"/calendar/weekly"}>
          <Button variant="link">
            <Calendar1Icon />
            Calendário semanal
          </Button>
        </Link>
        <Link href={"/calendar/monthly"}>
          <Button variant="link">
            <CalendarDaysIcon />
            Calendário mensal
          </Button>
        </Link>
      </div>
    </div>
  );
}
