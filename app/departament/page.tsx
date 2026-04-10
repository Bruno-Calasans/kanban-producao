"use client";

import PageTitle from "@/components/custom/PageTitle";
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments";
import { DepartamentTable } from "../../components/departament/table/DepartamentTable";
import CreateDepartamentDialog from "@/components/departament/dialogs/CreateDepartamentDialog";
import Loader from "@/components/custom/Loader";
import NoDefaultDepartamentWarn from "@/components/departament/table/NoDefaultDepartamentWarn";

export default function DepartamentPage() {
    const { data, isLoading, error } = useGetAllDepartaments()
    const departaments = data?.data || []


    if (isLoading) {
        return (
            <section>
                <PageTitle>Departamentos</PageTitle>
                <Loader title="Carregando departamentos..." />
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

    const hasDefaultDepartament = departaments.find(dpt => dpt.is_default)

    return (
        <section>
            <PageTitle>Departamentos</PageTitle>
            <div className="flex flex-col">
                {!hasDefaultDepartament && <NoDefaultDepartamentWarn />}
                <CreateDepartamentDialog />
                <DepartamentTable departaments={departaments} />
            </div>
        </section>
    )
}