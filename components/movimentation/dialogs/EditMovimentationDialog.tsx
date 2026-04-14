import CustomDialog from "@/components/custom/CustomDialog"
import type { MovimentationPopulated } from "@/types/database.type"
import EditMovimentationForm from "../forms/EditMovimentationForm"

type EditMovimentationDialogProps = {
    movimentation: MovimentationPopulated
    children?: React.ReactNode
}

export default function EditMovimentationDialog({ movimentation, children }: EditMovimentationDialogProps) {
    return (
        <CustomDialog
            id="edit-movimentation"
            title="Editar Movimentação"
            trigger={children}>
            <EditMovimentationForm movimentation={movimentation} />
        </CustomDialog>
    )

}