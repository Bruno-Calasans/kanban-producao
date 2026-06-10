import { MovimentationPopulated } from "@/types/database.type";
import { SingleSelector } from "./SingleSelector";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchableSelector } from "./SearchableSelector";

type MovimentationSelectorProps = {
  movimentations: MovimentationPopulated[];
  selectedMovimentation?: MovimentationPopulated;
  defaultMovimentation?: MovimentationPopulated;
  onValueChange(movimentation?: MovimentationPopulated): void;
};

export default function MovimentationSelector({
  movimentations,
  selectedMovimentation,
  defaultMovimentation,
  onValueChange,
}: MovimentationSelectorProps) {
  const defaultDpt = defaultMovimentation || selectedMovimentation || movimentations[0];

  return (
    <SearchableSelector<MovimentationPopulated>
      data={movimentations}
      selectedData={selectedMovimentation}
      defaultData={defaultDpt}
      labelSelector="id"
      customLabelSelector={(item) => `${item.product.name} | ${item.product.op} (${item.amount})`}
      onChange={onValueChange}
      searchPlaceholder="Pesquisa por produto ou OP"
      placeholder="Selecione a Movimentação"
      loadingMsg="Carregando as movimentações..."
      noItemFoundMsg={
        <div className="flex flex-col gap-1">
          <p>Nenhuma movimentação encontrada.</p>
          <p>
            Cadastre uma nova movimentação em{" "}
            <Link href="/movimentations">
              <Button size="sm" variant="link" className="p-0 font-bold">
                movimentações.
              </Button>
            </Link>
          </p>
        </div>
      }
    />
  );
}
