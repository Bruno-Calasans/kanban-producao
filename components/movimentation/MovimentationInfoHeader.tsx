import { MovimentationPopulated } from "@/types/database.type";
import Link from "next/link";
import MovimentationStatusBadge from "@/components/custom/badges/MovimentationStatusBadge";
import PageTitle from "@/components/custom/PageTitle";
import BackButton from "@/components/custom/buttons/BackButton";
import CustomDialog from "../custom/CustomDialog";
import { Button } from "../ui/button";
import EditMovimentationForm from "../movimentations/forms/EditMovimentationForm";
import { Edit2Icon, Trash2Icon, BanIcon } from "lucide-react";
import DeleteMovimentationDialog from "../movimentations/dialogs/DeleteMovimentationDialog";
import CancelMovimentationDialog from "../movimentations/dialogs/CancelMovimentationDialog";

type MovimentationInfoHeadergProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationInfoHeaderg({ movimentation }: MovimentationInfoHeadergProps) {
  const canEdit = movimentation.status == "PENDING";
  const canDelete = movimentation.status == "PENDING";
  const canCancel = movimentation.status != "CANCELLED" && movimentation.status != "COMPLETED";

  return (
    <div>
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
          </Link>
        </p>
        <p className="flex gap-1 items-start text-center">
          <strong>Status:</strong> <MovimentationStatusBadge movimentation={movimentation} />
        </p>
        <p>
          <strong>Quantidade:</strong> {movimentation.amount}
        </p>
      </div>

      <div className="flex gap-2 mb-4 border-black">
        {canEdit && (
          <CustomDialog
            id="edit-movimentation"
            title="Editar Movimentação"
            trigger={
              <Button className="m-0" size="xs">
                <Edit2Icon />
                Editar
              </Button>
            }
          >
            <EditMovimentationForm movimentation={movimentation} />
          </CustomDialog>
        )}

        {canCancel && (
          <CustomDialog
            id="cancel-movimentation"
            title="Editar Movimentação"
            trigger={
              <Button variant="destructive" className="m-0" size="xs">
                <BanIcon />
                Cancelar
              </Button>
            }
          >
            <CancelMovimentationDialog movimentation={movimentation} />
          </CustomDialog>
        )}

        {canDelete && (
          <CustomDialog
            id="delete-movimentation"
            title="Excluir Movimentação"
            trigger={
              <Button variant="destructive" className="m-0" size="xs">
                <Trash2Icon />
                Excluir
              </Button>
            }
          >
            <DeleteMovimentationDialog movimentation={movimentation} />
          </CustomDialog>
        )}
      </div>
    </div>
  );
}
