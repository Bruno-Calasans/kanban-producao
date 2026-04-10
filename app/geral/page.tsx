"use client"

import Loader from "@/components/custom/Loader"
import PageTitle from "@/components/custom/PageTitle"
import ProductLogTabs from "@/components/productLog/ProductLogTabs"
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments"

export default function productLogPage() {
    const { data, isLoading, error } = useGetAllDepartaments()
    const departaments = data?.data || []

    if (isLoading) {
        return (
            <section>
                <PageTitle>Registro de Produto</PageTitle>
                <Loader title="Carregando departamentos..." />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <PageTitle>Registro de Produto</PageTitle>
                <p>Ocorreu um erro ao carregar os departamentos.</p>
            </section>
        )
    }

    return (
        <section>
            <PageTitle>Registro de Produto</PageTitle>
            <ProductLogTabs departaments={departaments} />
        </section>
    )
}