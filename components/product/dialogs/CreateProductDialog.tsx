import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProductLogForm from "@/components/productLog/forms/CreateProductLogForm";


export default function CreateProductDialog() {
    return <CustomDialog
        id="create-product"
        title="Criar novo Registro"
        trigger={
            <AddButton label="Novo Registro" />
        }
    >
        <CreateProductLogForm />
    </CustomDialog>
}