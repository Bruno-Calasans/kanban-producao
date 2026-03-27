import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProcessForm from "@/components/process/forms/CreateProcessForm";


export default function CreateProcessDialog() {
    return <CustomDialog
        title="Criar novo processo"
        trigger={
            <AddButton label="Novo processo" />
        }
    >
        <CreateProcessForm />
    </CustomDialog>
}