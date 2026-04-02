import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateResponsibleForm from "@/components/responsible/forms/CreateResponsibleForm";


export default function CreateResponsibleDialog() {
    return (
        <CustomDialog
            id="create-responsible"
            title="Criar novo responsável"
            trigger={
                <AddButton label="Novo responsável" />
            }
        >
            <CreateResponsibleForm />
        </CustomDialog>
    )

}