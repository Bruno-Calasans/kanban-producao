import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateMovimentationForm from "@/components/movimentation/forms/CreateMovimentationForm";


export default function CreateMovimentationDialog() {
    return (
        <CustomDialog
            id="create-movimentation"
            title="Criar nova Movimentação"
            trigger={
                <AddButton label="Nova Movimentação" />
            }
            maxContentWidth={700}
        >
            <CreateMovimentationForm />
        </CustomDialog>
    )
}