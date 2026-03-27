"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllResponsibles from "@/hooks/responsible/useGetAllResponsibles";
import CreateResponsibleDialog from "@/components/responsible/dialogs/CreateResponsibleDialog";
import ResponsibleTable from "@/components/responsible/ResponsibleTable";


export default function ResponsiblePage() {
    const { data, isLoading, error } = useGetAllResponsibles()
    const responsibles = data?.data || []


    if (isLoading) {
        return (
            <section>
                <PageTitle>Responsável</PageTitle>
                <Loader title="Carregando Responsáveis..." />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <PageTitle>Responsável</PageTitle>
                <p>Ocorreu um erro ao carregar os Responsável.</p>
            </section>
        )
    }

    return (
        <section>
            <PageTitle>Responsável</PageTitle>
            <div className="flex flex-col">
                <CreateResponsibleDialog />
                <ResponsibleTable responsibles={responsibles} />
            </div>
        </section>
    )
}