import CustomDialog from "@/components/custom/CustomDialog"
import { Departament } from "@/types/database.type"
import EditDepartamentForm from "../forms/EditDepartamentForm"


type EditDepartamentDialogProps = {
    departament: Departament
    children?: React.ReactNode
}

export default function EditDepartamentDialog({ departament, children }: EditDepartamentDialogProps) {
    return <CustomDialog
        title="Editar departamento"
        trigger={children}>
        <EditDepartamentForm departament={departament} />
    </CustomDialog>
}