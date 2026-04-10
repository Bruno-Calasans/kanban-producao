import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProductForm from "../forms/CreateProductForm";

export default function CreateProductDialog() {
    return <CustomDialog
        id="create-product"
        title="Criar novo Produto"
        trigger={
            <AddButton label="Novo Produto" />
        }
    >
        <CreateProductForm />
    </CustomDialog>
}