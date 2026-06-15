import { ProductionPopulated } from "@/types/database.type";
import { Button } from "@/components/ui/button";
import { SearchableSelector } from "./SearchableSelector";
import Link from "next/link";

type ProductionSelectorProps = {
  productions: ProductionPopulated[];
  selectedProduction?: ProductionPopulated;
  defaultProduction?: ProductionPopulated;
  isLoading?: boolean;
  classname?: string;
  onValueChange(production?: ProductionPopulated): void;
};

export default function ProductionSelector({
  productions,
  selectedProduction,
  defaultProduction,
  isLoading,
  classname,
  onValueChange,
}: ProductionSelectorProps) {
  const defaultDpt = defaultProduction || selectedProduction;

  return (
    <SearchableSelector<ProductionPopulated>
      classname={classname}
      data={productions}
      selectedData={selectedProduction}
      defaultData={defaultDpt}
      labelSelector="id"
      customLabelSelector={(item) => `${item.op} | ${item.product.name}`}
      onChange={onValueChange}
      searchPlaceholder="Pesquisa por produto ou OP"
      placeholder="Selecione a produção"
      loadingMsg="Carregando as produções..."
      isLoading={isLoading}
      noItemFoundMsg={
        <div className="flex flex-col gap-1">
          <p>Nenhuma produção encontrada.</p>
          <p>
            Cadastre uma nova produção em{" "}
            <Link href="/productions">
              <Button size="sm" variant="link" className="p-0 font-bold">
                produções.
              </Button>
            </Link>
          </p>
        </div>
      }
    />
  );
}
