"use client";

import PageTitle from "@/components/custom/PageTitle";
import { DepartamentTable } from "../../components/departament/DepartamentTable";
import AddButton from "@/components/custom/buttons/AddButton";
import CustomDialog from "../../components/custom/CustomDialog";
import DepartamentForm from "@/components/departament/DepartamentFormt";

export default function DepartamentPage() {
    return (
        <section>
            <PageTitle>Departamentos</PageTitle>
            <div className="flex flex-col">

                <CustomDialog
                    trigger={
                        <AddButton label="Novo departamento" onClick={() => { }} />
                    }
                >
                    <DepartamentForm />
                </CustomDialog>
                <DepartamentTable departaments={[]} />
            </div>
        </section>
    )
}