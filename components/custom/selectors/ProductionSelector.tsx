import { ProductionPopulated } from "@/types/database.type";
import { Button } from "@/components/ui/button";
import { SearchableSelector } from "./SearchableSelector";
import Link from "next/link";
import NoItemFoundMsg from "../msgs/NoItemMsg";

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
        <NoItemFoundMsg
          title="Nenhuma produção ativa encontrada"
          desc="Cria uma nova produção em"
          url="/productions"
          urlName="produções"
        />
      }
    />
  );
}
