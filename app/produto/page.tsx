"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import CreateProductDialog from "@/components/product/dialogs/CreateProductDialog";
import ProductTable from "@/components/product/ProductTable";


export default function ProductPage() {
    const { data, isLoading, error } = useGetAllProducts()
    const products = data?.data || []


    if (isLoading) {
        return (
            <section>
                <PageTitle>Produtos</PageTitle>
                <Loader title="Carregando produtos..." />
            </section>
        )
    }

    if (error) {
        return (
            <section>
                <PageTitle>Produtos</PageTitle>
                <p>Ocorreu um erro ao carregar os produtos.</p>
            </section>
        )
    }

    return (
        <section>
            <PageTitle>Produtos</PageTitle>
            <div className="flex flex-col">
                <CreateProductDialog />
                <ProductTable products={products} />
            </div>
        </section>
    )
}