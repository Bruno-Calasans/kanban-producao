"use client";

import Loader from "@/components/custom/Loader";
import MovimentationTable from "@/components/movimentations/table/MovimentationTable";
import useGetAllMovimentationsByProduct from "@/hooks/movimentation/useGetAllMovimentationsByProduct";
import { ProductWithProductionFlow } from "@/types/database.type";

type ProductMovimentationTabProps = {
  product: ProductWithProductionFlow;
};

export default function ProductMovimentationsTab({ product }: ProductMovimentationTabProps) {
  const { data, error, isPending } = useGetAllMovimentationsByProduct(product.id);
  const movimentations = data?.data || [];

  if (isPending) return <Loader title="Procurando movimentações...." />;

  if (error) return <div>Erro ao carregar movimentações do produto</div>;

  return <MovimentationTable hideProductColumn movimentations={movimentations} />;
}
