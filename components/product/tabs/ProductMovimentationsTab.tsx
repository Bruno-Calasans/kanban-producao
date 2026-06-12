"use client";

import MovimentationTable from "@/components/productions/table/ProductionTable";
import { MovimentationPopulated, Product } from "@/types/database.type";

type ProductMovimentationTabProps = {
  product: Product;
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
