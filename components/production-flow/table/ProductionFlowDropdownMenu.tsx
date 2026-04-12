import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductionFlow } from "@/types/database.type";
import { Edit2Icon, EllipsisVerticalIcon, FlagIcon, Trash2Icon } from "lucide-react";
import DeleteProductionFlowDialog from "../dialogs/DeleteProductionFlowDialog";
import Link from "next/link";
import { toast } from "sonner";
import errorHandler from "@/utils/errorHandler";
import useSetDefaultProductionFlow from "@/hooks/production-flow/useSetDefaultProductionFlow";

type ProductionFlowDropdownMenuProps = {
  productionFlow: ProductionFlow;
};

export default function ProductionFlowDropdownMenu({
  productionFlow,
}: ProductionFlowDropdownMenuProps) {
  const { mutateAsync, isPending } = useSetDefaultProductionFlow();

  const handleSetDefault = async () => {
    if (isPending) return;
    try {
      await mutateAsync({ productionFlowId: productionFlow.id });
      toast.success("Fluxo de produção padrão atualizado com sucesso.");
    } catch (error) {
      errorHandler(error, {
        default: "Error: não foi possível definir fluxo de produção padrão.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit" side="bottom" align="end">
        {productionFlow.is_default ? null : (
          <DropdownMenuItem onSelect={handleSetDefault}>
            <FlagIcon />
            Marcar como padrão
          </DropdownMenuItem>
        )}

        <Link className="w-full" href={`/production-flow/edit/${productionFlow.id}`}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit2Icon />
            Editar
          </DropdownMenuItem>
        </Link>
        <DeleteProductionFlowDialog productionFlow={productionFlow}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Trash2Icon />
            Excluir
          </DropdownMenuItem>
        </DeleteProductionFlowDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
