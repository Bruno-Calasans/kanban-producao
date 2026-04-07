import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProductLogForm from "@/components/productLog/forms/CreateProductLogForm";


export default function CreateProductLogDialog() {
    return (
        <CustomDialog
            id="create-product-log"
            title="Criar Novo Registro"
            trigger={
                <AddButton label="Novo Registro" />
            }
            maxContentWidth={700}
        >
            <CreateProductLogForm />
        </CustomDialog>
    )
}