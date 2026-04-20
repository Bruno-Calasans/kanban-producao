"use client";

import PageTitle from "@/components/custom/PageTitle";
import Loader from "@/components/custom/Loader";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import CreateProductDialog from "@/components/products/dialogs/CreateProductDialog";
import ProductTable from "@/components/products/table/ProductTable";
import PageMsg from "@/components/custom/msgs/PageMsg";

export default function ProductPage() {
  const { data, isLoading, error } = useGetAllProducts();
  const products = data?.data || [];

  if (isLoading) {
    return <Loader title="Carregando produtos..." />;
  }

  if (error) {
    return (
      <PageMsg
        title="Erro"
        content="Algo deu errado ao carregar os produtos"
        backBtnLabel="Voltar à página inicial"
        backBtnUrl="/"
      />
    );
  }

  return (
    <section>
      <PageTitle>Produtos</PageTitle>
      <div className="flex flex-col">
        <CreateProductDialog />
        <ProductTable products={products} />
      </div>
    </section>
  );
}
