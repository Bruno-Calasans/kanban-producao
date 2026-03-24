"use client";

import PageTitle from "@/components/custom/PageTitle";
import AddButton from "@/components/custom/buttons/AddButton";
import CustomDialog from "../../components/custom/CustomDialog";
import DepartamentForm from "@/components/departament/DepartamentForm";
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments";
import { DepartamentTable } from "../../components/departament/DepartamentTable";

export default function DepartamentPage() {

    const { data, isLoading, error } = useGetAllDepartaments()
    const departaments = data?.data || []


    if (isLoading) {
        return (
            <section>
                <PageTitle>Departamentos</PageTitle>
                <p>Carregando...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <PageTitle>Departamentos</PageTitle>
                <p>Ocorreu um erro ao carregar os departamentos.</p>
            </section>
        )
    }


    return (
        <section>
            <PageTitle>Departamentos</PageTitle>
            <div className="flex flex-col">
                <CustomDialog
                    trigger={
                        <AddButton label="Novo departamento" />
                    }
                >
                    <DepartamentForm />
                </CustomDialog>
                <DepartamentTable departaments={departaments} />
            </div>
        </section>
    )
}