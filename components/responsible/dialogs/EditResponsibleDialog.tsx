import CustomDialog from "@/components/custom/CustomDialog"
import { ResponsibleWithDepartament } from "@/types/database.type"
import EditResponsibleForm from "@/components/responsible/forms/EditResponsibleForm"


type EditResponsibleDialogProps = {
    responsible: ResponsibleWithDepartament
    children?: React.ReactNode
}

export default function EditResponsibleDialog({ responsible, children }: EditResponsibleDialogProps) {
    return (
        <CustomDialog
            id="edit-responsible"
            title="Editar Responsável"
            trigger={children}>
            <EditResponsibleForm responsible={responsible} />
        </CustomDialog>
    )

}