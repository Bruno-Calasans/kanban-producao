"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllMovimentations from "@/hooks/movimentation/useGetAllMovimentation";
import CreateMovimentationDialog from "@/components/movimentation/dialogs/CreateMovimentationDialog";
import MovimentationTable from "@/components/movimentation/table/MovimentationTable";


export default function MovimentationPage() {
    const { data, isLoading, error } = useGetAllMovimentations()
    const movimentations = data?.data || []


    if (isLoading) {
        return (
            <section>
                <PageTitle>Movimentação</PageTitle>
                <Loader title="Carregando Movimentações..." />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <PageTitle>Movimentação</PageTitle>
                <p>Ocorreu um erro ao carregar as Movimentações.</p>
            </section>
        )
    }

    return (
        <section>
            <PageTitle>Movimentação</PageTitle>
            <div className="flex flex-col">
                <CreateMovimentationDialog />
                <MovimentationTable movimentations={movimentations} />
            </div>
        </section>
    )
}