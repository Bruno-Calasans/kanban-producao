import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProductForm from "@/components/product/forms/CreateProductForm";
import { useState } from "react";


export default function CreateProductDialog() {
    return <CustomDialog
        id="create-product"
        title="Criar novo produto"
        trigger={
            <AddButton label="Novo produto" />
        }
    >
        <CreateProductForm />
    </CustomDialog>
}