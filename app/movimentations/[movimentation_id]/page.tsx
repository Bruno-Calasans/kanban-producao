"use client";

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import MovimentationTabs from "@/components/movimentation/tabs/MovimentationTab";
import MovimentationStatusBadge from "@/components/custom/badges/MovimentationStatusBadge";
import getOneMovimentation from "@/hooks/movimentation/useGetOneMovimentation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { InfoIcon } from "lucide-react";

export default function MovimentationIdPage() {
  const params = useParams<{ movimentation_id: string }>();
  const { data, isPending } = getOneMovimentation(Number(params.movimentation_id));
  const movimentation = data?.data;

  if (isPending) return <Loader title="Carregando movimentação..." />;

  if (!movimentation)
    return (
      <section>
        <PageTitle>Informações do Movimentação</PageTitle>
        <p>Movimentação não encontrada</p>
      </section>
    );

  return (
    <section>
      <div className="flex justify-between">
        <PageTitle>Informações da Movimentação</PageTitle>
        <BackButton to="/movimentations" label="Voltar à página de Movimentações" />
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <p>
          <strong>ID:</strong> #{movimentation.id}
        </p>
        <p className="flex gap-1">
          <strong>Produto:</strong>{" "}
          <Link
            className="flex gap-1 justify-center items-center hover:underline"
            href={`/products/${movimentation.product.id}`}
          >
            {movimentation.product.name}
            <InfoIcon className="text-indigo-500" size={18} />
          </Link>
        </p>
        <p>
          <strong>Quantidade:</strong> {movimentation.amount}
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>Status:</strong> <MovimentationStatusBadge movimentation={movimentation} />
        </p>
      </div>
      <MovimentationTabs movimentation={movimentation} />
    </section>
  );
}
