import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductionFlow } from "@/types/database.type";
import {
  CheckIcon,
  Edit2Icon,
  EllipsisVerticalIcon,
  FlagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import DeleteProductionFlowDialog from "../dialogs/DeleteProductionFlowDialog";
import Link from "next/link";
import useSetDefaultProductionFlow from "@/hooks/production-flow/useSetDefaultProductionFlow";
import useActiveProductionFlow from "@/hooks/production-flow/useActiveProductionFlow";
import useGetlAllMovimentationsByProductionFlow from "@/hooks/movimentation/useGetlAllMovimentationsByProductionFlow";

type ProductionFlowDropdownMenuProps = {
  productionFlow: ProductionFlow;
};

export default function ProductionFlowDropdownMenu({
  productionFlow,
}: ProductionFlowDropdownMenuProps) {
  const { toggleActive } = useActiveProductionFlow({ productionFlow });
  const {
    data: movimentationData,
    error: productionFlowerror,
    isPending: isProductsPending,
  } = useGetlAllMovimentationsByProductionFlow(productionFlow.id);
  const movimentations = movimentationData?.data || [];

  const {
    setDefault,
    error: defaultProductionFlowError,
    isPending: isDefaultProductionFlowPending,
  } = useSetDefaultProductionFlow();

  const isError = productionFlowerror || defaultProductionFlowError;
  const isPending = isProductsPending || isDefaultProductionFlowPending;
  const canMarkAsDefault = productionFlow.is_active && !productionFlow.is_default;
  const canEdit = movimentations.length == 0;
  const canDelete = movimentations.length == 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit" side="bottom" align="end">
        {canMarkAsDefault && (
          <DropdownMenuItem onSelect={() => setDefault(productionFlow.id)}>
            <FlagIcon />
            Marcar como padrão
          </DropdownMenuItem>
        )}

        {canEdit && (
          <Link className="w-full" href={`/production-flows/edit/${productionFlow.id}`}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon />
              Editar
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuItem onSelect={toggleActive}>
          {productionFlow.is_active ? (
            <>
              <XIcon />
              Desativar
            </>
          ) : (
            <>
              <CheckIcon />
              Ativar
            </>
          )}
        </DropdownMenuItem>

        {canDelete && (
          <DeleteProductionFlowDialog productionFlow={productionFlow}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon />
              Excluir
            </DropdownMenuItem>
          </DeleteProductionFlowDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
