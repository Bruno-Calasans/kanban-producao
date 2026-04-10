"use client"

import BackButton from "@/components/custom/buttons/BackButton";
import Loader from "@/components/custom/Loader";
import PageTitle from "@/components/custom/PageTitle";
import EditProductionFlowForm from "@/components/production-flow/forms/EditProductionFlowForm";
import useGetOneProductionFlow from "@/hooks/production-flow/useGetOneProductionFlow";
import { useParams } from 'next/navigation'

export default function EditProductionFlowPage() {
    const params = useParams<{ id: string }>()
    const { data, isPending } = useGetOneProductionFlow(params.id)
    const productionFlow = data?.data

    if (isPending) return <Loader title="Carregando" />

    if (!productionFlow) {
        return (
            <section>
                <PageTitle>
                    Fluxo de produção não encontrado
                </PageTitle>
                <div className="flex flex-col gap-2">
                    <p>O fluxo de produção solicitado não foi encontrado.</p>
                    <BackButton label="Voltar" to="/production-flow" />
                </div>
            </section>
        )
    }

    return (
        <section>
            <div className="flex justify-between">
                <PageTitle>Editar Fluxo de Produção</PageTitle>
                <BackButton label="Voltar" to="/production-flow" />
            </div>
            <EditProductionFlowForm productionFlow={productionFlow} />
        </section>
    )
}