"use client"

import Loader from "@/components/custom/Loader"
import PageTitle from "@/components/custom/PageTitle"
import ProductLogTabs from "@/components/productLog/ProductLogTabs"
import useGetAllDepartaments from "@/hooks/departament/useGetAllDepartaments"

export default function geralPage() {
    const { data, isLoading, error } = useGetAllDepartaments()
    const departaments = data?.data || []

    if (isLoading) {
        return (
            <section>
                <PageTitle>Registro Geral</PageTitle>
                <Loader title="Carregando departamentos..." />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <PageTitle>Registro Geral</PageTitle>
                <p>Ocorreu um erro ao carregar as Departamentos</p>
            </section>
        )
    }

    return (
        <section>
            <PageTitle>Registro Geral</PageTitle>
            <ProductLogTabs departaments={departaments} />
        </section>
    )
}