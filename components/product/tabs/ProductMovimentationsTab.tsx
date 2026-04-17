"use client";

import MovimentationTable from "@/components/movimentations/table/MovimentationTable";
import { MovimentationPopulated, ProductWithProductionFlow } from "@/types/database.type";

type ProductMovimentationTabProps = {
  product: ProductWithProductionFlow;
  movimentations: MovimentationPopulated[];
};

export default function ProductMovimentationsTab({
  product,
  movimentations,
}: ProductMovimentationTabProps) {
  return (
    <div className="flex flex-col justify-end mt-2">
      <MovimentationTable hideProductColumn movimentations={movimentations} />;
    </div>
  );
}
