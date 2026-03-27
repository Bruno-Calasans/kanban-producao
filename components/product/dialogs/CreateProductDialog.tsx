import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProductForm from "@/components/product/forms/CreateProductForm";


export default function CreateProductDialog() {
    return <CustomDialog
        title="Criar novo producto"
        trigger={
            <AddButton label="Novo produto" />
        }
    >
        <CreateProductForm />
    </CustomDialog>
}